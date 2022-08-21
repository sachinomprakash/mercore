import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GliefApiService {
    constructor(private httpClient: HttpClient) {}

    getAutocompleteData(leiValue: string): Observable<object> {
        return this.httpClient.get(
            `https://api.gleif.org/api/v1/autocompletions?field=fulltext&q=${leiValue}`
        );
    }

    // getLIEData(): Observable<object>{
    //   return this.httpClient.get('https://api.gleif.org/api/v1/entity-legal-forms/AG')
    // }
}
