import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiEndPoint } from '../../constants/app.constant';
import { HttpService } from '../httpServices/http.service';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    public fileContent = new BehaviorSubject<any>({});
    public file = this.fileContent.asObservable();
    public docContent = new BehaviorSubject<any>(null);
    public docs = this.docContent.asObservable();
    public move = new BehaviorSubject<any>({});
    public stepperNext = this.move.asObservable();
    public profileDetails = new BehaviorSubject<any>({});
    public profileDetailsObservable = this.profileDetails.asObservable();
    public resetSearch = new BehaviorSubject<any>(false);
    public resetSearchObservable = this.resetSearch.asObservable();

    docFiles: any;
    activeDoc: any;
    movedStep: any;
    constructor(private httpService: HttpService) {}

    resetField(data: boolean) {
        this.resetSearch.next(data);
    }

    getLatestValue(data: any) {
        this.fileContent.next(data);
        this.docFiles = data;
    }
    getDocValue(data: any) {
        this.docContent.next(data);
        this.activeDoc = data;
    }
    moveStep(data: any) {
        this.move.next(data);
        this.movedStep = data;
    }
    getProfDetails(data: any) {
        this.profileDetails.next(data);
    }
    public getUserProfile(): Observable<any[]> {
        return this.httpService.getData(
            `${environment.userApiURL}${apiEndPoint.file.version}${apiEndPoint.user.profile}`
        );
    }
}
