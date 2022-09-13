import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { CaseTableEvent, status, tables } from 'src/app/utils/constants/app.constant';
import { MatDialog } from '@angular/material/dialog';
import { ProgresssummaryComponent } from 'src/app/cdd/progresssummary/progresssummary.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    cases: any = [];
    tableHeader = tables.cases;
    inProgressCases: any = [];
    totalCases: any = [];
    inProgressCasesDefault: any = [];
    submittedCases: any = [];
    submittedCasesDefault: any = [];
    completedCases: any = [];
    completedCasesDefault: any = [];
    constructor(
        private router: Router,
        private staticService: StaticService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.staticService.getTableData().subscribe(res => {
            this.cases = res.result;
            for (const item of this.cases) {
                if (item.status == status.OPEN) {
                    item.object_type = item.caseType.type;
                }
                if (item.status == status.INPROGRESS) {
                    item.object_type = item.caseType.type;
                    this.inProgressCases.push(item);
                    this.inProgressCasesDefault = this.inProgressCases;
                }
                if (item.status == status.SUBMITTED) {
                    item.object_type = item.caseType.type;
                    this.submittedCases.push(item);
                    this.submittedCasesDefault = this.submittedCases;
                }
                if (item.status == status.COMPLETED) {
                    item.object_type = item.caseType.type;
                    this.completedCases.push(item);
                    this.completedCasesDefault = this.completedCases;
                }
            }
            this.totalCases = this.cases;
        });
    }
    continue() {
        this.router.navigateByUrl(`/${modulePath.cdd}/${routeConstant.uploadDocs}`);
    }
    onActionTrigger(event: any) {
        const { record, actionType } = event;
        switch (actionType) {
            case CaseTableEvent.Continue:
                this.router.navigateByUrl(
                    `/${modulePath.cdd}/${routeConstant.uploadDocs}/${record.id}`
                );
                break;
            case CaseTableEvent.ProgressSummary:
                this.dialog.open(ProgresssummaryComponent, {
                    width: '85vw',
                    panelClass: 'popup-wrap',
                    data: {
                        caseId: record.id,
                        entityId: record.entity_id
                    }
                });
                break;
        }
    }
    seachCases(ev: any) {
        if (ev.target.value) {
            this.cases = this.filteredValue(
                ev.target.value.toLowerCase(),
                ['id', 'company_name'],
                this.totalCases
            );

            if (this.inProgressCasesDefault.length > 0) {
                this.inProgressCases = this.filteredValue(
                    ev.target.value.toLowerCase(),
                    ['id', 'company_name'],
                    this.inProgressCasesDefault
                );
            } else if (this.submittedCasesDefault.length > 0) {
                this.submittedCases = this.filteredValue(
                    ev.target.value.toLowerCase(),
                    ['id', 'company_name'],
                    this.submittedCasesDefault
                );
            } else if (this.completedCasesDefault.length > 0) {
                this.completedCases = this.filteredValue(
                    ev.target.value.toLowerCase(),
                    ['id', 'company_name'],
                    this.completedCasesDefault
                );
            }
        } else {
            this.cases = this.totalCases;
            if (this.inProgressCasesDefault.length > 0) {
                this.inProgressCases = this.inProgressCasesDefault;
            }
            if (this.submittedCasesDefault.length > 0) {
                this.submittedCases = this.submittedCasesDefault;
            }
            if (this.completedCasesDefault.length > 0) {
                this.completedCases = this.completedCasesDefault;
            }
        }
    }
    filteredValue(search: any, keys: any, list: any) {
        let lowSearch = search.toLowerCase();
        return list.filter((cases: any) =>
            keys.some((key: any) =>
                String(cases[key])
                    .toLowerCase()
                    .includes(lowSearch)
            )
        );
    }
}
