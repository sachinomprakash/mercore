import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { apiEndPoint } from 'src/app/utils/constants/app.constant';
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class CddServiceService {
    prefix = '/case-task';
    apiUrl = environment.caseTaskApiURL;
    kycUrl = environment.kycOpsApiURL;
    kycAppUrl = environment.kycAppApiURL;

    stepperIndex = new Subject();
    searchField = new BehaviorSubject('');
    private selectedStepData = new BehaviorSubject(null);

    getSelectedStepData(): Observable<any> {
        return this.selectedStepData.asObservable();
    }

    setSelectedStepData(val: any): void {
        this.selectedStepData.next(val);
    }

    constructor(private httpService: HttpService) {}
    public getCaseById(caseId: number): Observable<any[]> {
        return this.httpService.getData(
            `${this.apiUrl}${apiEndPoint.file.version}${apiEndPoint.file.cases}/${caseId}/new`
        );
    }

    public getDocs(caseId: number, entityId: string): Observable<any[]> {
        return this.httpService.getData(
            `${this.kycAppUrl}${apiEndPoint.file.version}${apiEndPoint.file.cases}/${caseId}${apiEndPoint.file.entity}/${entityId}${apiEndPoint.file.documents}`
        );
    }

    getAllQuestions(payload: any): Observable<object> {
        return this.httpService.getData(
            `${this.kycUrl}${apiEndPoint.kyc.entity}/${payload.entity_id}/${apiEndPoint.kyc.question}`
        );
    }

    getProgressSummary(caseId: any): Observable<object> {
        // https://dev-app-api.mercore.com/case-task/v1/cases/25/summary
        return this.httpService.getData(
            `${this.apiUrl}${apiEndPoint.file.version}${apiEndPoint.file.cases}/${caseId}/summary`
        );
    }
}
