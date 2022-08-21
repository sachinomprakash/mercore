import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDocRequest, IFile } from 'src/app/models/case.model';
import { modulePath } from 'src/app/utils/constants/route.constant';
import { CommonService } from 'src/app/utils/services/common/common.service';

@Component({
    selector: 'app-company-profile',
    templateUrl: './company-profile.component.html',
    styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit, OnChanges {
    @Input() companyDocs: IDocRequest;
    @Input() entityId: any;
    @Input() caseId: any;
    file: IFile;
    constructor(private commonService: CommonService, private router: Router) {}
    caseDocs: any = [];
    caseObj: any;
    ngOnInit(): void {}
    ngOnChanges(): void {}

    returnHome() {
        this.router.navigateByUrl(`/${modulePath.home}`);
    }
    forward() {
        this.commonService.moveStep({ move: true });
    }
    activeDoc(ev: any) {
        this.findFiles(ev);
    }
    setDocumentComplete(completedDoc: any) {
        const cDoc = this.companyDocs?.files.find((doc: any) => doc.name === completedDoc.name);
    }

    findFiles(selectedDoc: IFile) {
        const obj = this.companyDocs?.files.find((file: IFile) => file.id === selectedDoc.id);
        if (obj) {
            this.file = obj;
        }
        this.commonService.getLatestValue(this.file);
    }
    docCompleted(event: any) {}
}
