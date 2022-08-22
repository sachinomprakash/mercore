import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    ChangeDetectorRef,
    OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { take } from 'rxjs/operators';
import { modulePath } from 'src/app/utils/constants/route.constant';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { CddServiceService } from 'src/app/utils/services/httpServices/cdd/cdd-service.service';

@Component({
    selector: 'app-document-container',
    templateUrl: './document-container.component.html',
    styleUrls: ['./document-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentContainerComponent implements OnInit, OnDestroy {
    @Input() entityId: any;
    @Input() caseId: any;
    files: any;
    stepInfo: any;

    selectedStepDataSub: Subscription;

    constructor(
        private commonService: CommonService,
        private router: Router,
        private cddServiceService: CddServiceService,
        private cdRef: ChangeDetectorRef
    ) {}
    ngOnInit(): void {
        this.selectedStepDataSub = this.cddServiceService
            .getSelectedStepData()
            ?.subscribe((res: any) => {
                this.stepInfo = res;
                this.cdRef.markForCheck();
            });
    }

    returnHome(): void {
        this.router.navigateByUrl(`/${modulePath.home}`);
    }

    forward(): void {
        this.commonService.moveStep({ move: true });
    }

    back(): void {
        this.commonService.moveStep({ move: false });
    }

    activeDoc(ev: any): void {
        this.findFiles(ev);
    }

    findFiles(selectedDoc: any): void {
        this.files = this.stepInfo.types.find((doc: any) => doc.name === selectedDoc.name);
        this.commonService.getLatestValue(this.files);
    }

    ngOnDestroy(): void {
        this.selectedStepDataSub?.unsubscribe();
    }
}
