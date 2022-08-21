import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-wallet-documentation',
    templateUrl: './wallet-documentation.component.html',
    styleUrls: ['./wallet-documentation.component.scss']
})
export class WalletDocumentationComponent implements OnInit {
    isFirst: boolean = true;
    @Input() summaryDocs: any;
    constructor() {}

    ngOnInit(): void {}
}
