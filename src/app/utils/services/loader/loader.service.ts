import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    _pageLoader = new BehaviorSubject(false);

    constructor() {}

    show() {
        this._pageLoader.next(true);
    }
    hide() {
        this._pageLoader.next(false);
    }
}
