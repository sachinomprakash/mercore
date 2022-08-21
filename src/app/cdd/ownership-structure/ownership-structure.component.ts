import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CDDRequest } from 'src/app/utils/constants/cdd.constants';
import { modulePath } from 'src/app/utils/constants/route.constant';
import { CommonService } from 'src/app/utils/services/common/common.service';

@Component({
    selector: 'app-ownership-structure',
    templateUrl: './ownership-structure.component.html',
    styleUrls: ['./ownership-structure.component.scss']
})
export class OwnershipStructureComponent implements OnInit {
    @Input() ownershipDocs: any;
    @Input() entityId: any;
    @Input() caseId: any;
    files: any;
    constructor(private commonService: CommonService, private router: Router) {}
    ngOnInit(): void {}
    ngOnChanges(): void {}

    returnHome() {
        this.router.navigateByUrl(`/${modulePath.home}`);
    }
    forward() {
        this.commonService.moveStep({ move: true });
    }
    back() {
        this.commonService.moveStep({ move: false });
    }
    activeDoc(ev: any) {
        this.findFiles(ev);
    }
    setDocumentComplete(completedDoc: any) {
        const cDoc = this.ownershipDocs.files.find((doc: any) => doc.name === completedDoc.name);
    }

    findFiles(selectedDoc: any) {
        this.files = this.ownershipDocs.files.find((doc: any) => doc.name === selectedDoc.name);
        this.commonService.getLatestValue(this.files);
    }
}
