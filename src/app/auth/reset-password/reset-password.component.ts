import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { formValidationMessage } from 'src/app/utils/constants/message.constant';
import { UserService } from 'src/app/utils/services/httpServices/user.service';
import { PatternConstants } from 'src/app/utils/constants/patternConstants';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetForm: any = FormGroup;
    validationMessage = formValidationMessage;
    loginPath = `/${modulePath.auth}/${routeConstant.login}`;
    token!: string;
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.initLoginForm();
        this.activatedRoute.params.subscribe({
            next: (res: any) => {
                this.token = res.token;
                // Handle Reset Token
            }
        });
    }
    initLoginForm() {
        this.resetForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(PatternConstants.email)]]
        });
    }
    onSubmit() {
        if (this.resetForm?.invalid) {
            return;
        }
        // API Call
        this.userService
            .forgotPassword({ email: this.resetForm?.value.email.toLowerCase() })
            .subscribe({
                next: this.handleResponse.bind(this),
                error: this.handleError.bind(this)
            });
    }
    get controls() {
        return this.resetForm.controls;
    }
    handleResponse(response: any) {
        this.alertService.openSnackBar(response.message, 'success');
    }
    handleError(error: any) {
        this.alertService.openSnackBar(error.error.message, 'error');
    }
}
