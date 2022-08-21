import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UtilsModule } from '../utils/utils.module';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { PolicyComponent } from './policy/policy.component';
import { MaterialModule } from '../modules/material/material.module';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

@NgModule({
    declarations: [
        LoginComponent,
        ResetPasswordComponent,
        CreatePasswordComponent,
        OtpComponent,
        SignUpComponent,
        VerifyEmailComponent,
        PolicyComponent,
        ConfirmEmailComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        UtilsModule
    ]
})
export class AuthModule {}
