import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { modulePath, routeConstant } from '../../constants/route.constant';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        } else {
            this.router.navigateByUrl(`/${modulePath.auth}/${routeConstant.login}`);
            return false;
        }
    }
}
