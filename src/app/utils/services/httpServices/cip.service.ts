import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { apiEndPoint } from '../../constants/app.constant';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class CipService {
    syncCipData = new BehaviorSubject(false);
    private moveToNextStep: Subject<boolean> = new Subject<boolean>();
    private backToStep: Subject<boolean> = new Subject<boolean>();
    apiUrl = environment.kycApiURL;
    apiStaticUrl = environment.staticApiURL;

    constructor(private httpService: HttpService) {}

    public getMoveToNextStep(): Subject<boolean> {
        return this.moveToNextStep;
    }

    public setMoveToNextStep(value: boolean): void {
        this.moveToNextStep.next(value);
    }

    public getBackToStep(): Subject<boolean> {
        return this.backToStep;
    }

    public setBackToStep(value: boolean): void {
        this.backToStep.next(value);
    }

    addCIP(data: any, stage: string): Observable<any> {
        if (stage === '2') {
            data.date_of_incorporation_object = {
                date: data.day,
                month: data.month,
                year: data.year
            };
        }
        return this.httpService.putData(
            `${this.apiUrl}${apiEndPoint.cip.add}?stage=${stage}`,
            data
        );
    }

    addOtherCIP(data: any): Observable<any> {
        return this.httpService.postData(
            `${this.apiStaticUrl}${apiEndPoint.cip.otherProductMaster}`,
            data
        );
    }

    postCipData(data: any, stage: string): Observable<any> {
        return this.httpService.postData(
            `${this.apiUrl}${apiEndPoint.cip.addNew}?stage=${stage}`,
            data
        );
    }

    getCIPData(): Observable<any> {
        return this.httpService.getData(`${this.apiUrl}${apiEndPoint.cip.add}`);
    }
}
