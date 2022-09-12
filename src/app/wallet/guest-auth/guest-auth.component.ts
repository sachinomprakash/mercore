import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestAuthType, storageKeys } from 'src/app/utils/constants/app.constant';
import { PatternConstants } from 'src/app/utils/constants/patternConstants';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { AuthService } from 'src/app/utils/services/authService/auth.service';
import { WalletService } from 'src/app/utils/services/httpServices/wallet.service';

@Component({
    selector: 'app-guest-auth',
    templateUrl: './guest-auth.component.html',
    styleUrls: ['./guest-auth.component.scss']
})
export class GuestAuthComponent implements OnInit {
    guestAuthType: any;
    authType: GuestAuthType;
    contentId: string;
    guestSession: string;
    btnText: string;

    userSession: { user_id: string; email: string; sharedContentId: string };
    isSubmitted = false;
    hide = true;
    authForm!: FormGroup;
    rememberMe: boolean | undefined;
    resetPath = `/${modulePath.auth}/${routeConstant.reset}`;
    registerPath = `/${modulePath.auth}/${routeConstant.register}`;

    constructor(
        private fb: FormBuilder,
        private alertService: AlertService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private walletService: WalletService
    ) {
        this.guestAuthType = GuestAuthType;
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe({
            next: (res: any) => {
                this.authType = res.type || GuestAuthType.login;
                if (res.session) {
                    this.guestSession = res.session;
                    this.contentId = res.content;
                    this.authService.setData(storageKeys.guestContentId, res.content);
                    this.authService.setData(storageKeys.accessToken, res.session);
                    this.verifyGuestSession();
                }
                this.setAuthType(null, this.authType);
            }
        });
    }

    setAuthType(event: any, authType: GuestAuthType) {
        if (event) {
            event.preventDefault();
        }
        this.authType = authType;
        if (authType == GuestAuthType.login) {
            this.btnText = 'Log in';
            this.initLoginForm();
        } else {
            this.btnText = 'Sign Up';
            this.initSignupForm();
        }
    }

    verifyGuestSession() {
        this.walletService.verifyGuestUserSession().subscribe({
            next: res => {
                this.userSession = res;
                this.controls['email'].setValue(this.userSession.email);
            },
            error: err => {
                console.log(err);
            }
        });
    }

    initLoginForm() {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(PatternConstants.email)]],
            password: ['', Validators.required]
        });
    }

    initSignupForm() {
        this.authForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            company: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(PatternConstants.email)]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.authForm?.invalid) {
            return;
        }
        if (this.authType == GuestAuthType.login) {
            this.loginUser();
        } else {
            this.registerUser();
        }
    }

    registerUser() {
        const data: any = {
            firstName: this.authForm?.value.firstName,
            lastName: this.authForm?.value.lastName,
            userId: this.userSession.user_id,
            company: this.authForm?.value.company,
            password: this.authForm?.value.password
        };
        this.walletService.registerGuestUser(data).subscribe({
            next: (res: any) => {
                this.alertService.openSnackBar('You are registered successfully', 'success');
                this.router
                    .navigate(['/guest/auth'], { queryParams: { type: GuestAuthType.login } })
                    .then(res => {
                        location.reload();
                    });
                // this.setAuthType(null, GuestAuthType.login);
            },
            error: (err: any) => {
                this.alertService.openSnackBar(err.error.message, 'error');
            }
        });
    }

    loginUser() {
        const data = {
            email: this.authForm?.value.email.toLowerCase(),
            password: this.authForm?.value.password
        };
        this.walletService.loginGuestUser(data).subscribe({
            next: (res: any) => {
                this.authService.setData(storageKeys.accessToken, res?.result?.accessToken);
                this.router.navigateByUrl('/guest/wallet');
            },
            error: (err: any) => {
                this.alertService.openSnackBar(err.error.message, 'error');
            }
        });
    }

    get controls() {
        return this.authForm?.controls;
    }
    public errorHandling = (control: string, error: string) => {
        return this.authForm?.controls[control].hasError(error);
    };
}
