import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { storageKeys } from 'src/app/utils/constants/app.constant';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { LoaderService } from '../loader/loader.service';

@Injectable({
    providedIn: 'root'
})
export class ReqInterceptor implements HttpInterceptor {
    isRefreshing!: boolean;
    constructor(
        private router: Router,
        private alertService: AlertService,
        private loaderService: LoaderService
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = localStorage.getItem(storageKeys.accessToken);
        let cloneReq = request;
        if (token && request.url.includes('api.mercore.com')) {
            cloneReq = this.addTokenHeader(request, `Bearer ${token}`);
        }

        return next.handle(cloneReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if ([401].includes(error.status)) {
                    return this.handleForbiddenError(request, next, error);
                } else if (error.status === 500) {
                    return throwError(error);
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private handleForbiddenError(
        request: HttpRequest<any>,
        next: HttpHandler,
        error: HttpErrorResponse
    ): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.loaderService.hide();
            const refreshTokrn = localStorage.getItem(storageKeys.refreshToken);
            localStorage.clear();
            this.alertService.openSnackBar('Session Expired', 'error');
            this.router.navigateByUrl(`/${modulePath.auth}`);
            // if (refreshTokrn) {
            //   return this.authService.getRefreshToken().pipe(
            //     switchMap((data: any) => {
            //       this.isRefreshing = false;
            //       this.authService.setToken(data);
            //       return next.handle(this.addTokenHeader(request, data.accessToken));
            //     }),
            //     catchError((err) => {
            //       this.isRefreshing = false;

            //       this.authService.logout();
            //       return throwError(err);
            //     })
            //   );
            // } else {
            //   this.isRefreshing = false;
            // }
        }
        return throwError(error);
    }

    addTokenHeader(request: HttpRequest<any>, token: any) {
        return request.clone({
            headers: request.headers.set(storageKeys.authorization, token)
        });
    }
}
