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
        const connectedIndividualOb = {
            name: 'Connected Individuals',
            progressStatus: this.summaryDocs?.personData?.progressStatus,
            types: this.summaryDocs?.personData?.docs
        };
        this.additionalRequests = this.summaryDocs?.additionalRequests;
        this.personDocs = this.summaryDocs?.personData;
        if (this.personDocs) {
            if (this.summaryDocs.entity_documents) {
                this.summaryDocs.entity_documents?.splice(2, 0, connectedIndividualOb);
            } else {
                this.summaryDocs.entity_documents = [connectedIndividualOb];
            }
        }
        this.additionalReqCount = this.additionalRequests?.docs?.reduce(
            (acc: any, val: any) => acc + val.questions.length,
            0
        );
    }
}
