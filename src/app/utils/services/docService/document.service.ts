import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private moveToNextDocType: Subject<boolean> = new Subject<boolean>();
    docUploaded = new Subject();
    userDocUploaded = new Subject();
    emptyDoc = new Subject();

    public getMoveToNextDocType(): Subject<boolean> {
        return this.moveToNextDocType;
    }

    public setMoveToNextDocType(value: boolean): void {
        this.moveToNextDocType.next(value);
    }
}
