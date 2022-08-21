import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { apiEndPoint } from 'src/app/utils/constants/app.constant';
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    constructor(private httpService: HttpService) {}

    removeFile(
        fileId: string,
        caseId: any,
        typeId: any,
        deleteDocId?: any,
        component?: any,
        entityId?: string,
        personId?: string,
        document_id?: string
    ) {
        let url: any;
        switch (component) {
            case 'addDocs':
                url = `${environment.kycApiURL}${apiEndPoint.people.personDoc}/${deleteDocId}${apiEndPoint.file.files}/${fileId}`;
                break;
            case 'soucesOfWealth':
                url = `${environment.kycApiURL}${apiEndPoint.people.entities}/${entityId}${apiEndPoint.people.persons}/${personId}${apiEndPoint.ubo.uboKyc}/${fileId}`;
                break;
            default:
                url = `${environment.kycApiURL}${apiEndPoint.kyc.entity}/${entityId}${apiEndPoint.file.document}/${document_id}${apiEndPoint.file.file}/${fileId}`;
                break;
        }
        return this.httpService.deleteFileData(url);
    }
    addComments(
        data: any,
        fileId: string,
        caseId: any,
        typeId: any,
        component?: any,
        personId?: string,
        id?: string,
        document_id?: string,
        entityId?: string,
        sowId?: string
    ): Observable<any> {
        let url: any;
        switch (component) {
            case 'addDocs':
                url = `${environment.kycApiURL}${apiEndPoint.people.personDoc}/${id}`;
                break;
            case 'soucesOfWealth':
                url = `${environment.kycApiURL}${apiEndPoint.people.entities}/${entityId}${apiEndPoint.people.persons}/${personId}${apiEndPoint.ubo.uboKyc}/${sowId}`;
                data = {
                    _id: sowId,
                    document_types: [
                        {
                            source_of_wealth_document_id: typeId,
                            comment: data.comment,
                            _id: id
                        }
                    ]
                };
                break;
            default:
                url = `${environment.kycApiURL}${apiEndPoint.file.version}${apiEndPoint.file.document}/${document_id}`;
                break;
        }
        return this.httpService.putData(url, data);
    }

    public uploadFile(
        files: any,
        entityId: string,
        typeId: any,
        mappingId?: any,
        caseId?: any,
        component?: string,
        document_id?: any,
        source_of_wealth_id?: any,
        personId?: any,
        id?: any
    ): Observable<any[]> {
        let url: any;
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        const formData: FormData = new FormData();
        if (files.length > 1) {
            for (let file of files) {
                formData.append('files', file);
            }
        } else {
            formData.append('file', files[0]);
        }
        switch (component) {
            case 'addDocs':
                formData.append('entityId', entityId);
                formData.append('documentTypeId', document_id);
                url = `${environment.kycApiURL}${apiEndPoint.people.version}${apiEndPoint.people.persons}/${personId}${apiEndPoint.people.upload}`;
                break;
            case 'soucesOfWealth':
                id && formData.append('id', id);
                formData.append('source_of_wealth_document_id', typeId);
                url = `${environment.kycApiURL}${apiEndPoint.people.entities}/${entityId}${apiEndPoint.people.persons}/${personId}${apiEndPoint.ubo.uboKyc}${apiEndPoint.ubo.upload}`;
                break;
            default:
                formData.append('entityId', entityId);
                formData.append('document_mapping_id', mappingId);
                url = `${environment.kycApiURL}${apiEndPoint.kyc.entity}${apiEndPoint.file.doc}`;
                break;
        }
        return this.httpService
            .postFormData(url, formData, {
                headers
            })
            .pipe(map((res: any) => res));
    }
}
