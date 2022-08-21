import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { routeConstant } from '../utils/constants/route.constant';
import { PolicyComponent } from './policy/policy.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: routeConstant.login
    },
    {
        path: routeConstant.login,
        component: LoginComponent
    },
    {
        path: routeConstant.register,
        component: SignUpComponent
    },
    {
        path: routeConstant.reset,
        component: ResetPasswordComponent
    },
    {
        path: `${routeConstant.setPassword}/:token`,
        component: CreatePasswordComponent
    },
    {
        path: routeConstant.verifyOTP,
        component: OtpComponent
    },
    {
        path: routeConstant.verifyEmail,
        component: VerifyEmailComponent
    },
    {
        path: routeConstant.policy,
        component: PolicyComponent
    },
    {
        path: `${routeConstant.confirm}/:token`,
        component: ConfirmEmailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
