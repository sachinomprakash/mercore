import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { storageKeys } from '../../constants/app.constant';
import { AlertService } from '../alertService/alert.service';
import { UserService } from '../httpServices/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private router: Router
    ) {}

    isUserLogin(): boolean {
        return !!localStorage.getItem(storageKeys.accessToken);
    }
    getStorageValue(key: string): string {
        return localStorage.getItem(key) || '';
    }
    setData(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    logout() {
        // Call logout API
        localStorage.clear();
    }

    // Login helper
    loginUser(data: any) {
        this.userService.loginUser(data).subscribe({
            next: this.handleLoginResponse.bind(this),
            error: this.handleLoginError.bind(this)
        });
    }
    handleLoginResponse(response: any) {
        this.setData(storageKeys.accessToken, response?.result?.accessToken);
        this.router.navigateByUrl('/cases/list');
    }
    handleLoginError(error: any) {
        this.alertService.openSnackBar(error.error.message);
    }
}
