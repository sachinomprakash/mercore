import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CDDRequest } from 'src/app/utils/constants/cdd.constants';
import { modulePath } from 'src/app/utils/constants/route.constant';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { CddServiceService } from 'src/app/utils/services/httpServices/cdd/cdd-service.service';

@Component({
    selector: 'app-document-container',
    templateUrl: './document-container.component.html',
    styleUrls: ['./document-container.component.scss']
})
export class DocumentContainerComponent implements OnInit {
    @Input() entityId: any;
    @Input() caseId: any;
    files: any;
    stepInfo: any;
    constructor(
        private commonService: CommonService,
        private router: Router,
        private cddServiceService: CddServiceService
    ) {}
    ngOnInit(): void {
        this.cddServiceService.selectedStepData.subscribe(res => {
            this.stepInfo = res;
        });
    }
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

    findFiles(selectedDoc: any) {
        this.files = this.stepInfo.types.find((doc: any) => doc.name === selectedDoc.name);
        this.commonService.getLatestValue(this.files);
    }
}
