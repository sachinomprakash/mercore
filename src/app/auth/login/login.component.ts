import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { PatternConstants } from 'src/app/utils/constants/patternConstants';
import { UserService } from 'src/app/utils/services/httpServices/user.service';
// import { Login } from './model/login.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    isSubmitted = false;
    hide = true;
    loginForm!: FormGroup;
    rememberMe: boolean | undefined;
    resetPath = `/${modulePath.auth}/${routeConstant.reset}`;
    registerPath = `/${modulePath.auth}/${routeConstant.register}`;
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initLoginForm();
    }

    initLoginForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(PatternConstants.email)]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(64),
                    Validators.pattern(PatternConstants.password)
                ]
            ]
        });
    }
    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        const data = this.loginForm?.value;
        data.email = data.email.toLowerCase();
        this.userService.loginUser(data).subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError.bind(this)
        });
    }
    handleResponse(response: any) {
        localStorage.setItem('token', response.result.accessToken);
        this.router.navigateByUrl(`/${modulePath.auth}/${routeConstant.verifyOTP}`);
    }
    handleError(error: any) {
        this.alertService.openSnackBar(error.error.message, 'error');
    }
    public errorHandling = (control: string, error: string) => {
        return this.loginForm.controls[control].hasError(error);
    };
}
