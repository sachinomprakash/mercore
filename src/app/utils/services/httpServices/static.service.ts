import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndPoint } from 'src/app/utils/constants/app.constant';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class StaticService {
    apiUrl = environment.staticApiURL;
    constructor(private httpService: HttpService) {}

    getCountries(): Observable<object> {
        return this.httpService.getData(`${this.apiUrl}${apiEndPoint.static.getCountries}`);
    }
    getLegalEntity(): Observable<object> {
        return this.httpService.getData(`${this.apiUrl}${apiEndPoint.static.getLegalEntity}`);
    }
    getIndustrySector(): Observable<object> {
        return this.httpService.getData(`${this.apiUrl}${apiEndPoint.static.industrySector}`);
    }
    getSectorOfTrade() {
        return this.httpService.getData(`${this.apiUrl}${apiEndPoint.static.industryProducts}`);
    }
    getProductMaster() {
        return this.httpService.getData(`${this.apiUrl}${apiEndPoint.static.getProductMaster}`);
    }
    getTableData(): Observable<any> {
        return this.httpService.getData(
            `${environment.apiURL}${apiEndPoint.cases.caseTask}${apiEndPoint.cases.add}`
        );
    }
    getRoles(formId: any) {
        return this.httpService.getData(`${this.apiUrl}${apiEndPoint.static.getRoles}/${formId}`);
    }
    getSourcesOfWealth() {
        return this.httpService.getData(`${this.apiUrl}${apiEndPoint.static.sow}`);
    }
    getSourcesOfWealthDocs() {
        return this.httpService.getData(`${this.apiUrl}${apiEndPoint.static.sowDocs}`);
    }
    getLegalFormData(countryId: number) {
        return this.httpService.getData(
            `${this.apiUrl}${apiEndPoint.static.legalForm}?countryIds=${countryId}`
        );
    }
}
