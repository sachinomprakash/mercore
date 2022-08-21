import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    moveToNextDocType = new BehaviorSubject(false);
    docUploaded = new Subject();
    userDocUploaded = new Subject();
    emptyDoc = new Subject();

val:boolean;

    constructor() {}

    
    public getvalue() : Observable<any> {
        console.log('gets');
        
        return this.moveToNextDocType.asObservable();
    }

    
    public setvalue(v : boolean) {
        console.log('setval', v);
        
        this.moveToNextDocType.next(v);
    }
    
    

    // nextDoc() {
    //     this.moveToNextDocType.next(true);
    // }
}
