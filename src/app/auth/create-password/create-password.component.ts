import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { userPasswordType } from 'src/app/utils/constants/app.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { formValidationMessage } from 'src/app/utils/constants/message.constant';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/utils/services/httpServices/user.service';
import { PasswordValidator } from 'src/app/utils/helpers/password-validator';

@Component({
    selector: 'app-create-password',
    templateUrl: './create-password.component.html',
    styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {
    createPasswordForm!: FormGroup;
    passhide = true;
    confPasshide = true;
    validationMessage = formValidationMessage;
    loginPath = `/${modulePath.auth}/${routeConstant.login}`;
    barColorOrder: string[] = ['#4CAF50', 'orange', 'orangered', 'darkred'];
    token!: string;
    passwordStrengthLevel!: { status: string; barColor: string } | undefined;
    successFullSubmission = false;
    passwordType!: number;
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe({
            next: (res: any) => {
                this.token = res.token;
                // Handle Reset Token
            }
        });
        this.activatedRoute.queryParams.subscribe({
            next: (res: any) => {
                this.passwordType = res.type;
            }
        });
        this.initLoginForm();
    }
    initLoginForm() {
        this.createPasswordForm = this.fb.group(
            {
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(64),
                        PasswordValidator.hasNumber,
                        PasswordValidator.hasUpper,
                        PasswordValidator.specailChar
                    ]
                ],
                confirmPassword: ['', Validators.required]
            },
            {
                validator: PasswordValidator.mustMatch('password', 'confirmPassword')
            }
        );
    }
    get controls() {
        return this.createPasswordForm.controls;
    }
    onSubmit() {
        if (this.createPasswordForm?.invalid) {
            return;
        }
        // API Call
        if (this.passwordType == userPasswordType.setPassword) {
            this.userService.setPassword(this.token, this.createPasswordForm?.value).subscribe({
                next: this.handleResponse.bind(this),
                error: this.handleError.bind(this)
            });
        } else {
            this.userService.resetPassword(this.token, this.createPasswordForm?.value).subscribe({
                next: this.handleResponse.bind(this),
                error: this.handleError.bind(this)
            });
        }
    }
    getValidateIcon(type: string) {
        if (this.controls['password'].hasError('required')) {
            return 'assets/images/disable-right.svg';
        }
        return this.controls['password'].hasError(type)
            ? 'assets/images/disable-right.svg'
            : 'assets/images/enable-right.svg';
    }
    getBarColor(level: number): string {
        const password: any = this.controls['password'];
        const errorCounts = password.errors ? Object.keys(password.errors).length : 0;
        const errorExists = errorCounts > 0;
        const leastValidationResolve = errorCounts < 4;
        if (
            !this.controls['password'].hasError('required') &&
            errorExists &&
            leastValidationResolve &&
            level <= 4 - errorCounts
        ) {
            return this.barColorOrder[errorCounts];
        } else if (!errorExists) {
            return this.barColorOrder[0];
        }
        return '#ddd';
    }
    handleResponse(response: any) {
        this.successFullSubmission = true;
    }
    handleError(error: any) {
        this.alertService.openSnackBar(error.error.message, 'error');
    }
}
