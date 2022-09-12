import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { serverStatusCode } from 'src/app/utils/constants/app.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { UserService } from 'src/app/utils/services/httpServices/user.service';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit, OnDestroy {
    form!: FormGroup;
    formInput = ['input1', 'input2', 'input3', 'input4'];
    @ViewChildren('formRow') rows: any;
    errorMessage!: string;
    loginSuccess!: boolean;
    errorCode!: any;
    resendOTPIn!: number;

    otpAttemptTimeLeft!: number;
    enterOTPUnblock!: number;
    sendOTPUnblock!: number;

    otpLimitExceedTimer!: Subscription;
    resendOTPTimerId!: Subscription;
    verifyLimitExceedtimerId!: Subscription;
    serverStatusCode = serverStatusCode;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private router: Router
    ) {}
    ngOnDestroy(): void {
        this.resendOTPTimerId?.unsubscribe();
        this.verifyLimitExceedtimerId?.unsubscribe();
        this.otpLimitExceedTimer?.unsubscribe();
    }

    ngOnInit(): void {
        this.form = this.toFormGroup(this.formInput);
        this.userService.getTTLForResentOTP().subscribe({
            next: res => {
                this.resendOTPIn =
                    res.result?.seconds?.resendOTPTTL < 0 ? 0 : res.result?.seconds?.resendOTPTTL;

                this.enterOTPUnblock =
                    res.result?.seconds?.enterOTPUnblock > 0
                        ? res.result?.seconds?.enterOTPUnblock
                        : 0;
                // this.startVerifyLimitExceedCounter();
                if (this.resendOTPIn) {
                    this.resendOTPTimerId = this.startResendOTPCounter();
                }
                if (this.enterOTPUnblock) {
                    this.startVerifyLimitExceedCounter();
                }
            }
        });
    }

    toFormGroup(elements: string[]) {
        const group: any = {};
        elements.forEach((key: string) => {
            group[key] = new FormControl('', [Validators.required, Validators.maxLength(1)]);
        });
        return new FormGroup(group);
    }
    get controls() {
        return this.form.controls;
    }
    keyUpEvent(event: any, index: number) {
        let pos = index;
        if (event.keyCode === 8 && event.which === 8) {
            pos = index - 1;
        } else if (!this.controls[this.formInput[index]].invalid) {
            pos = index + 1;
        }

        if (pos > -1 && pos < this.formInput.length) {
            this.rows._results[pos].nativeElement.focus();
        }
    }
    onSubmit() {
        if (this.form.invalid) {
            return;
        }
        if (
            this.errorCode?.serverCode == serverStatusCode.otpSendLimitExceed ||
            this.errorCode?.serverCode == serverStatusCode.enterOTPLimitExceed
        ) {
            return;
        }
        let otp = '';
        for (const key in this.form.value) {
            otp += this.form.value[key];
        }
        this.userService.verifyOTP({ otp }).subscribe({
            next: (res: any) => {
                localStorage.setItem('token', res.result.accessToken);
                localStorage.setItem('refreshToken', res.result.refreshToken);
                this.errorMessage = '';
                this.loginSuccess = true;
                this.router.navigate(['/customer']);
            },
            error: (err: any) => {
                this.errorMessage = err.error.message;
                this.errorCode = err.error;

                if (this.errorCode.serverCode == serverStatusCode.enterOTPLimitExceed) {
                    if (!this.verifyLimitExceedtimerId) {
                        this.enterOTPUnblock = this.errorCode?.data?.seconds;
                        this.startVerifyLimitExceedCounter();
                    }
                } else if (this.errorCode.serverCode == serverStatusCode.otpExpire) {
                    this.alertService.openSnackBar(err.error.message, 'error');
                }
            }
        });
    }

    sendOTP() {
        if (
            this.errorCode?.serverCode == serverStatusCode.otpSendLimitExceed ||
            this.errorCode?.serverCode == serverStatusCode.enterOTPLimitExceed
        ) {
            return;
        }
        this.userService.sendOTP().subscribe({
            next: (res: any) => {
                this.errorMessage = '';
                this.errorCode = undefined;
                this.resendOTPIn = res.result?.seconds || 60;
                this.resendOTPTimerId = this.startResendOTPCounter();
                this.alertService.openSnackBar(res.message);
            },
            error: err => {
                this.errorMessage = err.error.message;
                this.errorCode = err.error;
                if (
                    this.errorCode.serverCode == serverStatusCode.otpAlreadySent ||
                    this.errorCode.serverCode == serverStatusCode.otpSendLimitExceed
                ) {
                    if (!this.otpLimitExceedTimer) {
                        this.sendOTPUnblock = this.errorCode?.data?.seconds;
                        this.otpLimitExceedTimer = this.startSendLimitExceedCounter();
                    }
                }
            }
        });
    }
    startSendLimitExceedCounter(): Subscription {
        return interval(1000).subscribe({
            next: () => {
                if (this.sendOTPUnblock <= 0) {
                    this.errorCode = undefined;
                    // this.otpLimitExceedTimer.unsubscribe();
                } else {
                    this.sendOTPUnblock--;
                }
            }
        });
    }
    startVerifyLimitExceedCounter() {
        this.verifyLimitExceedtimerId = interval(1000).subscribe({
            next: () => {
                if (this.enterOTPUnblock <= 0) {
                    this.errorCode = undefined;
                } else {
                    this.enterOTPUnblock--;
                }
            }
        });
    }
    startResendOTPCounter() {
        return interval(1000).subscribe({
            next: () => {
                if (this.resendOTPIn <= 0) {
                    this.resendOTPTimerId.unsubscribe();
                } else {
                    this.resendOTPIn--;
                }
            }
        });
    }
}
