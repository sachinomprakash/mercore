import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { CddServiceService } from 'src/app/utils/services/httpServices/cdd/cdd-service.service';
import { KycService } from 'src/app/utils/services/httpServices/kyc.service';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-additional-request',
    templateUrl: './additional-request.component.html',
    styleUrls: ['./additional-request.component.scss']
})
export class AdditionalRequestComponent implements OnInit, OnChanges {
    displayedColumns: string[] = ['type', 'category'];
    dataSource: any;
    @Input() allStepsValid: boolean;
    @Output() onNext = new EventEmitter();
    @Output() addtionalRequestStepperValid = new EventEmitter();
    isFormValid = [];
    @Input() entityId: string;
    allStepStatus: boolean;
    caseId: any;
    constructor(
        public commonservice: CommonService,
        public kycService: KycService,
        public cddServiceService: CddServiceService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe({
            next: (res: any) => {
                this.caseId = res.caseId;
            }
        });
        this.getAllQuestionList();
    }

    ngOnChanges() {
        this.allStepStatus = this.allStepsValid;
    }

    forward() {
        this.commonservice.moveStep({ move: true });
    }

    back() {
        this.commonservice.moveStep({ move: false });
    }

    goToSection(category: string) {
        this.cddServiceService.stepperIndex.next(category);
    }
    textAreaValid() {
        this.isFormValid = this.dataSource.filter((item: any) => !item.answer);
        if (this.isFormValid.length == 0) {
            this.addtionalRequestStepperValid.emit(true);
        } else {
            this.addtionalRequestStepperValid.emit(false);
        }
    }
    submitAnswers() {
        this.alertService
            .openConfirmDialog(
                `You are about to submit your application. Are you sure?`,
                'Yes',
                'Cancel',
                'confirmAction'
            )
            .subscribe((res: any) => {
                if (res) {
                    let questionsArray: any = [];
                    this.dataSource.map((item: any) => {
                        let question = { _id: item._id, answer: item.answer };
                        questionsArray.push(question);
                    });
                    let payload = { questions: questionsArray, caseId: this.caseId };
                    this.kycService.putAdditinalRequest(payload, this.entityId).subscribe({
                        next: res => {
                            this.showToast(
                                'You have successfully submitted your application',
                                'sucess'
                            );
                            this.onNext.emit({ valid: true });
                        },
                        error: err => {
                            this.showToast('Please complete all the sections to submit', 'error');
                        }
                    });
                    this.addtionalRequestStepperValid.emit(true);
                }
            });
    }
    showToast(message: any, messageType: string) {
        this.alertService.openSnackBar(message, messageType);
    }

    getAllQuestionList() {
        const payload = {
            entity_id: this.entityId
        };
        this.kycService.getAllQuestions(payload).subscribe((res: any) => {
            this.dataSource = res.result;
            this.textAreaValid();
        });
    }
}
