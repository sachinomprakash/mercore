import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { modulePath } from '../../constants/route.constant';
import { AuthService } from '../authService/auth.service';

@Injectable({
    providedIn: 'root'
})
export class PreLoginGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.isUserLogin()) {
            return true;
        } else {
            this.router.navigateByUrl(`/${modulePath.customer}`);
            return false;
        }
    }
}
