import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { apiEndPoint } from 'src/app/utils/constants/app.constant';
import { environment } from 'src/environments/environment';
import { HttpService } from '../httpServices/http.service';

@Injectable({
    providedIn: 'root'
})
export class KybService {
    kybApiUrl = environment.kybApiURL;

    constructor(private httpService: HttpService) {}

    getCompanyInfo(data: any, entityId: any): Observable<object> {
        return this.httpService.postData(
            `${this.kybApiUrl}${apiEndPoint.kyb.getCompanyInfo}?entityId=${entityId}`,
            data
        );
    }
}
