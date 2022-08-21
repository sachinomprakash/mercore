import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
@Component({
    selector: 'app-progress-accordion',
    templateUrl: './progress-accordion.component.html',
    styleUrls: ['./progress-accordion.component.scss']
})
export class ProgressAccordionComponent implements OnInit {
    isFirst: boolean = true;
    panelOpenState = false;
    @Input('summaryDocs') summaryDocs: any;
    @ViewChild(MatAccordion) accordion!: MatAccordion;
    companyDocs: any;
    ownerShipDocs: any;
    additionalRequests: any;
    personDocs: any;
    additionalReqCount: any;
    constructor() {}

    ngOnInit(): void {
        this.companyDocs = this.summaryDocs?.entityDocs?.find(
            (doc: any) => doc.name === 'Company Profile'
        );
        this.ownerShipDocs = this.summaryDocs?.entityDocs?.find(
            (doc: any) => doc.name === 'Ownership'
        );
        this.additionalRequests = this.summaryDocs?.additionalRequests;
        this.personDocs = this.summaryDocs?.personData;
        this.additionalReqCount = this.additionalRequests?.items?.reduce(
            (acc: any, val: any) => acc + val.questions.length,
            0
        );
    }
}
