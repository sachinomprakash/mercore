import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiEndPoint } from '../../constants/app.constant';
import { HttpService } from '../httpServices/http.service';

@Injectable({
    providedIn: 'root'
})
export class OnFidoService {
    apiUrl = environment.kycApiURL;

    constructor(private httpService: HttpService) {}

    updateKYCStatus(data: any) {
        return this.httpService.putData(
            `${this.apiUrl}${apiEndPoint.people.version}${apiEndPoint.people.persons}${apiEndPoint.people.onfidovalidation}`,
            data
        );
    }
}
