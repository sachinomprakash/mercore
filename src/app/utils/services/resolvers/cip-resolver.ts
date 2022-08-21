import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CipService } from '../httpServices/cip.service';

@Injectable({
    providedIn: 'root'
})
export class CIPResolverService implements Resolve<any> {
    constructor(private cipService: CipService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        console.log('Called Get CIP data in resolver...', route);
        return this.cipService.getCIPData().pipe(
            map(res => res.result),
            catchError(error => {
                return of('No data');
            })
        );
    }
}
