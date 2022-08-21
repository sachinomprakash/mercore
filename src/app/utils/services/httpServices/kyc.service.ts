import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { apiEndPoint } from 'src/app/utils/constants/app.constant';
import { HttpService } from '../httpServices/http.service';

@Injectable({
    providedIn: 'root'
})
export class KycService {
    kycUrl = environment.kycAppApiURL;
    stepperIndex = new Subject();
    constructor(private httpService: HttpService) {}

    getAllQuestions(payload: any): Observable<object> {
        return this.httpService.getData(
            `${this.kycUrl}${apiEndPoint.kyc.entity}/${payload.entity_id}/${apiEndPoint.kyc.getAllQuestion}`
        );
    }

    putAdditinalRequest(data: any, entityId: string): Observable<any> {
        return this.httpService.putData(
            `${this.kycUrl}${apiEndPoint.kyc.entity}/${entityId}/${apiEndPoint.kyc.question}`,
            data
        );
    }
}
