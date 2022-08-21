import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { CddServiceService } from 'src/app/utils/services/httpServices/cdd/cdd-service.service';
import { pickBy, identity } from 'lodash';
import { IDocRequest } from 'src/app/models/case.model';
import { CDDDocRequests } from 'src/app/utils/constants/app.constant';
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

    constructor(
        private cddServiceService: CddServiceService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.cddServiceService.getProgressSummary(this.data.caseId).subscribe((res: any) => {
            this.summaryDocs = {
                ...res.result,
                entityDocs: [
                    {
                        name: 'Company Profile',
                        files: this.filterEntityDocs(
                            res.result.entityDocs,
                            CDDDocRequests.arrayOfCompanyProfile
                        ).files,
                        progressStatus: this.getStatus(this.filterDoc)
                    },
                    {
                        name: 'Ownership',
                        files: this.filterEntityDocs(
                            res.result.entityDocs,
                            CDDDocRequests.arrayOfOwnershipDocs
                        ).files,
                        progressStatus: this.getStatus(this.filterDoc)
                    }
                ]
            };
            this.allItems = Object.keys(res.result).length;
            this.inProgressDocs = this.getSortedDocs('In Progress');
            this.submittedDocs = this.getSortedDocs('Submitted');
            this.completedDocs = this.getSortedDocs('Completed');
            this.inProgressCount = this.getCount(this.inProgressDocs);
            this.submittedDocsCount = this.getCount(this.submittedDocs);
            this.completedDocsCount = this.getCount(this.completedDocs);
        });
        this.filterDocs({ target: { value: '' } });
    }

    filterEntityDocs(entityDocs: any, docs: any) {
        let filteredDocs: any = [];
        entityDocs.forEach((doc: IDocRequest) => {
            docs.forEach((cpDocs: any) => {
                if (cpDocs.replace(' ', '') === doc.name.replace(' ', '')) {
                    doc?.files.map((i: any) => filteredDocs.push(i));
                }
            });
        });
        this.filterDoc = filteredDocs;
        return { files: filteredDocs };
    }

    getStatus(filteredDocs: any) {
        const statusCount = filteredDocs.filter((doc: any) => {
            return doc.progressStatus === 'Outstanding';
        });
        let status;
        if (statusCount.length > 0) {
            status = 'In Progress';
        } else {
            status = 'Completed';
        }
        return status;
    }

    getSortedDocs(type: string) {
        return {
            additionalRequests:
                this.summaryDocs.additionalRequests.progressStatus === type
                    ? this.summaryDocs.additionalRequests
                    : undefined,
            entityDocs:
                this.summaryDocs.entityDocs.filter(
                    (doc: any) =>
                        doc.progressStatus === type && doc.name !== 'Further Documentation'
                ).length > 0
                    ? this.summaryDocs.entityDocs.filter(
                          (doc: any) =>
                              doc.progressStatus === type && doc.name !== 'Further Documentation'
                      )
                    : undefined,
            personData:
                this.summaryDocs.personData.progressStatus === type
                    ? this.summaryDocs.personData
                    : undefined
        };
    }

    getCount(obj: any) {
        let count;
        const refinedObj = pickBy(obj, v => v !== undefined);
        if (refinedObj['entityDocs'] && refinedObj['entityDocs'].length > 1) {
            return (count = Object.keys(refinedObj).length + 1);
        } else {
            return (count = Object.keys(refinedObj).length);
        }
    }

    filterDocs(ev: any) {
        this.cddServiceService.searchField.next(ev.target.value);
    }
}
