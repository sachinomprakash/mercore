import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    options: AnimationOptions = {
        path: 'assets/loader.json'
    };
    constructor() {}

    ngOnInit(): void {}

    animationCreated(animationItem: AnimationItem): void {
        console.log(animationItem);
    }
}
