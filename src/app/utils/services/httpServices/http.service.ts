import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private httpClient: HttpClient) {}

    postData(apiPath: string, data: any) {
        return this.httpClient.post(`${apiPath}`, data);
    }

    postFormData(apiPath: string, data: any, headers: any) {
        return this.httpClient.post(`${apiPath}`, data, headers);
    }

    deleteFileData(apiPath: string, data?: any, formData?: boolean) {
        const apiUrl = `${apiPath}`;
        return this.httpClient.delete(apiUrl, data);
    }

    getData(apiPath: string, data?: any, option?: any) {
        return this.httpClient.get(`${apiPath}`, { params: data, ...option }).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    putData(apiPath: string, data: any) {
        return this.httpClient.put(`${apiPath}`, data);
    }

    putOpsData(apiPath: string, data: any) {
        return this.httpClient.put(`${apiPath}`, data);
    }

    deleteData(apiPath: string, data?: any, formData?: boolean) {
        const apiUrl = `${apiPath}`;
        return this.httpClient.delete(apiUrl, data);
    }
}
