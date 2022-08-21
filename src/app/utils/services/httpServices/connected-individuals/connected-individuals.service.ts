import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { apiEndPoint } from 'src/app/utils/constants/app.constant';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class ConnectedIndividualsService {
    apiUrl = environment.kycApiURL;
    IndividualStepperActive = new Subject();
    connctedIndividualStepperStatus = new Subject();
    docComplete = new Subject();
    sowComplete = new Subject();

    constructor(private httpService: HttpService) {}

    getAllIndividuals(entityId: string, filter: string): Observable<any> {
        return this.httpService.getData(
            `${this.apiUrl}${apiEndPoint.people.entity}/${entityId}${apiEndPoint.people.person}${
                filter ? `?filter=${filter}` : ''
            }`
        );
    }

    createIndividual(entityId: string, data: any): Observable<any> {
        return this.httpService.postData(
            `${this.apiUrl}${apiEndPoint.people.entity}/${entityId}${apiEndPoint.people.person}`,
            data
        );
    }

    updateIndividual(entityId: string, personId: string, data: any): Observable<any> {
        return this.httpService.putData(
            `${this.apiUrl}${apiEndPoint.people.entity}/${entityId}${apiEndPoint.people.person}/${personId}`,
            data
        );
    }

    getIndividualDocs(entityId: string, personId: string): Observable<any> {
        return this.httpService.getData(
            `${this.apiUrl}${apiEndPoint.people.entity}/${entityId}${apiEndPoint.people.person}/${personId}?expand=doc`
        );
    }

    getIndividualDetails(entityId: string, personId: string): Observable<any> {
        return this.httpService.getData(
            `${this.apiUrl}${apiEndPoint.people.entity}/${entityId}${apiEndPoint.people.person}/${personId}`
        );
    }

    deleteIndividual(personId: string): Observable<any> {
        return this.httpService.deleteData(
            `${this.apiUrl}${apiEndPoint.people.version}${apiEndPoint.people.persons}/${personId}`
        );
    }

    // sources of wealth KYC documents
    getUboKycDocs(entityId: string, personId: string): Observable<any> {
        return this.httpService.getData(
            `${this.apiUrl}${apiEndPoint.people.entities}/${entityId}${apiEndPoint.people.persons}/${personId}${apiEndPoint.ubo.uboKyc}`
        );
    }

    getUboKycById(entityId: string, personId: string, id: string): Observable<any> {
        return this.httpService.getData(
            `${this.apiUrl}${apiEndPoint.people.entities}/${entityId}${apiEndPoint.people.persons}/${personId}${apiEndPoint.ubo.uboKyc}/${id}`
        );
    }

    creatUboKyc(entityId: string, personId: string, data: any) {
        return this.httpService.postData(
            `${this.apiUrl}${apiEndPoint.people.entities}/${entityId}${apiEndPoint.people.persons}/${personId}${apiEndPoint.ubo.uboKyc}`,
            data
        );
    }
    updateUboKyc(entityId: string, personId: string, data: any, sowId: string) {
        return this.httpService.putData(
            `${this.apiUrl}${apiEndPoint.people.entities}/${entityId}${apiEndPoint.people.persons}/${personId}${apiEndPoint.ubo.uboKyc}/${sowId}`,
            sowId ? { ...data, _id: sowId } : data
        );
    }
    deleteUboKyc(entityId: string, personId: string, sowId: string) {
        return this.httpService.deleteData(
            `${this.apiUrl}${apiEndPoint.people.entities}/${entityId}${apiEndPoint.people.persons}/${personId}${apiEndPoint.ubo.uboKyc}/${sowId}`
        );
    }
}
