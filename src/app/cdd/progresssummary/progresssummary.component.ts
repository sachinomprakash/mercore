import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { CddServiceService } from 'src/app/utils/services/httpServices/cdd/cdd-service.service';
import { pickBy } from 'lodash';
@Component({
    selector: 'app-progresssummary',
    templateUrl: './progresssummary.component.html',
    styleUrls: ['./progresssummary.component.scss']
})
export class ProgresssummaryComponent implements OnInit {
    isFirst: boolean = true;
    panelOpenState = false;
    @Input('caseInfoObj') caseInfoObj: any;
    @ViewChild(MatAccordion) accordion!: MatAccordion;
    summaryDocs: any;
    inProgressDocs: any;
    allItems: number;
    inProgressCount: number;
    submittedDocsCount: number;
    completedDocsCount: number;
    submittedDocs: any;
    completedDocs: any;
    searchString: any;
    filterDoc: any;
    totalCount: number;

    constructor(
        private cddServiceService: CddServiceService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.getSummaryDetails();
    }

    getSummaryDetails() {
        this.cddServiceService
            .getProgressSummary(this.data.caseId, this.data.entityId)
            .subscribe((res: any) => {
                this.totalCount = res.result.entity_documents.length + 2;

                this.summaryDocs = {
                    ...res.result,
                    additionalRequests: {
                        docs: res.result.additional_requests,
                        progressStatus: res.result.progressStatus.additional_requests
                    },
                    personData: {
                        docs: res.result.connected_individuals,
                        progressStatus: res.result.progressStatus.connected_individuals
                    }
                };
                this.inProgressDocs = this.getSortedDocs('In Progress');
                this.submittedDocs = this.getSortedDocs('Submitted');
                this.completedDocs = this.getSortedDocs('Completed');
                this.inProgressCount = this.getCount(this.inProgressDocs);
                this.submittedDocsCount = this.getCount(this.submittedDocs);
                this.completedDocsCount = this.getCount(this.completedDocs);
            });
        this.filterDocs({ target: { value: '' } });
    }

    getSortedDocs(type: string) {
        return {
            additionalRequests:
                this.summaryDocs.additionalRequests.progressStatus === type
                    ? this.summaryDocs.additionalRequests
                    : undefined,
            entity_documents:
                this.summaryDocs.entity_documents.filter((doc: any) => doc.progressStatus === type)
                    .length > 0
                    ? this.summaryDocs.entity_documents.filter(
                          (doc: any) => doc.progressStatus === type
                      )
                    : undefined,
            personData:
                this.summaryDocs.personData.progressStatus === type
                    ? this.summaryDocs.personData
                    : undefined
        };
    }

    getCount(obj: any) {
        const refinedObj = pickBy(obj, v => v !== undefined);
        if (refinedObj['entity_documents'] && refinedObj['entity_documents'].length >= 1) {
            return Object.keys(refinedObj).length - 1 + refinedObj['entity_documents'].length;
        } else {
            return Object.keys(refinedObj).length;
        }
    }

    filterDocs(ev: any) {
        this.cddServiceService.searchField.next(ev.target.value);
    }
}
