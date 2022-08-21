import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndPoint } from 'src/app/utils/constants/app.constant';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    apiUrl = environment.userApiURL;
    constructor(private httpService: HttpService) {}

    registerUser(data: any): Observable<object> {
        return this.httpService.postData(`${this.apiUrl}${apiEndPoint.user.register}`, data);
    }
    loginUser(data: any): Observable<object> {
        return this.httpService.postData(`${this.apiUrl}${apiEndPoint.user.login}`, data);
    }
    verifyOTP(data: any) {
        return this.httpService.postData(`${this.apiUrl}${apiEndPoint.user.verifyOTP}`, data);
    }
    sendOTP() {
        return this.httpService.postData(`${this.apiUrl}${apiEndPoint.user.sendOTP}`, {});
    }
    setPassword(token: string, data: any) {
        return this.httpService.postData(
            `${this.apiUrl}${apiEndPoint.user.setPassword}${token}`,
            data
        );
    }
    resetPassword(token: string, data: any) {
        return this.httpService.postData(
            `${this.apiUrl}${apiEndPoint.user.resetPassword}${token}`,
            data
        );
    }
    forgotPassword(data: any) {
        return this.httpService.postData(`${this.apiUrl}${apiEndPoint.user.forgotPassword}`, data);
    }
    resendVerificationEmail(data: any) {
        return this.httpService.postData(`${this.apiUrl}${apiEndPoint.user.resendEmail}`, data);
    }
    getTTLForResentOTP() {
        return this.httpService.getData(`${this.apiUrl}${apiEndPoint.user.resentOTPTTL}`);
    }
    updateUserProfile(data: any) {
        return this.httpService.putData(`${this.apiUrl}${apiEndPoint.user.profileUpdate}`, data);
    }
    changePassword(data: any) {
        return this.httpService.postData(`${this.apiUrl}${apiEndPoint.user.changePassword}`, data);
    }
    verifyEmail(token: string) {
        return this.httpService.postData(
            `${this.apiUrl}${apiEndPoint.user.emailChange}/${token}`,
            {}
        );
    }
}
