import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiEndPoint } from '../../constants/app.constant';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class WalletService {
    kycApp = environment.kycAppApiURL;
    constructor(private httpService: HttpService) {}

    verifyGuestUserSession() {
        const url = `${this.kycApp}${apiEndPoint.wallet.verifySession}`;
        return this.httpService.getData(url).pipe(map(res => res.result));
    }

    registerGuestUser(user: { name: string; userId: string; comapny: string; password: string }) {
        const url = `${this.kycApp}${apiEndPoint.wallet.guestSignUp}`;
        return this.httpService.postData(url, user);
    }

    loginGuestUser(cred: { email: string; password: string }) {
        const url = `${this.kycApp}${apiEndPoint.wallet.guestLogin}`;
        return this.httpService.postData(url, cred);
    }

    getSharedContentData(contentId: string) {
        const url = `${this.kycApp}${apiEndPoint.wallet.getContent}${contentId}`;
        return this.httpService.getData(url).pipe(map(res => res.result));
    }
}
