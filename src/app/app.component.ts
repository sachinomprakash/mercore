import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { LoaderService } from './utils/services/loader/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'mercore';
    showLoader: boolean;
    constructor(private loaderService: LoaderService) {
        this.loaderService._pageLoader.subscribe({
            next: status => (this.showLoader = status)
        });
    }
}
