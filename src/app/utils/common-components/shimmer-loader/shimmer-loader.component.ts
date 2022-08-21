import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-shimmer-loader',
    templateUrl: './shimmer-loader.component.html',
    styleUrls: ['./shimmer-loader.component.scss']
})
export class ShimmerLoaderComponent implements OnInit {
    @Input() type: String;
    constructor() {}

    ngOnInit(): void {}
}
