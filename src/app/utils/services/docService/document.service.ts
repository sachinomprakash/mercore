import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private moveToNextDocType = new BehaviorSubject(false);
    docUploaded = new Subject();
    userDocUploaded = new Subject();
    emptyDoc = new Subject();

    val: boolean;

    constructor() {}

    public getMoveToNextDocType(): Observable<boolean> {
        console.log('wahat val', this.moveToNextDocType.value);
        return this.moveToNextDocType.asObservable();
    }

    public setMoveToNextDocType(v: boolean) {
        console.log('setvalue', v, this.moveToNextDocType.value);
        // if (this.moveToNextDocType.value === v) {
        //     this.moveToNextDocType.next(!v);
        // } else {
        //     this.moveToNextDocType.next(v);
        // }
        // this.moveToNextDocType.next([...this.moveToNextDocType.value, v]);
        this.moveToNextDocType.next(v);
    }

    getVal(): boolean {
        return this.moveToNextDocType.value;
    }

    // nextDoc() {
    //     this.moveToNextDocType.next(true);
    // }
}
