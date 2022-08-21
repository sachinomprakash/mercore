import { KycService } from './../../utils/services/httpServices/kyc.service';
import { DocumentService } from './../../utils/services/docService/document.service';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { CddServiceService } from 'src/app/utils/services/httpServices/cdd/cdd-service.service';
import { ActivatedRoute } from '@angular/router';
import { CDDDocRequests } from 'src/app/utils/constants/app.constant';
import { Case, IDocRequest } from 'src/app/models/case.model';
import { ProgresssummaryComponent } from '../progresssummary/progresssummary.component';
import { MatDialog } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ConnectedIndividualsService } from 'src/app/utils/services/httpServices/connected-individuals/connected-individuals.service';

@Component({
    selector: 'app-cdd-wrapper',
    templateUrl: './cdd-wrapper.component.html',
    styleUrls: ['./cdd-wrapper.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false }
        }
    ]
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CddWrapperComponent implements OnInit, DoCheck {
    selectedIndex: number = 0;
    isLinear = true;
    editable: boolean = true;
    companyDocs?: any;
    ownershipDocs?: any;
    case: Case;
    caseId: any;
    companyValidFiles: any;
    ownershipValidFiles: any;
    allStepsvalid: boolean;
    stepperIndex: number;
    addtionalRequestValid: boolean = false;
    allQuestionhaveAnswerStatus: any;
    connectedIndividuals: any;
    entityDocs: any = [];
    selectedStepObj: any;

    constructor(
        private commonService: CommonService,
        private activatedRoute: ActivatedRoute,
        private cddServiceService: CddServiceService,
        public dialog: MatDialog,
        private documentService: DocumentService,
        private connectedIndividualsService: ConnectedIndividualsService,
        private kycService: KycService,
        private cdRef: ChangeDetectorRef
    ) {}
    @ViewChild('stepper') private myStepper: MatStepper;
    ngOnInit(): void {
        this.activatedRoute.params.subscribe({
            next: (res: any) => {
                this.caseId = res.caseId;
            }
        });
        this.getCaseData();
        setTimeout(() => {
            this.commonService.move.subscribe(x => {
                x.move ? this.goForward(this.myStepper) : this.goBack(this.myStepper);
            });

            this.documentService.docUploaded.subscribe((res: any) => {
                if (res) {
                    this.selectedStepObj.types.find((type: any) => type._id === res._id).comment =
                        res.comment;
                    this.setSectionStatus(this.entityDocs);
                }
            });
            this.documentService.emptyDoc.subscribe((res: any) => {
                this.selectedStepObj.types.find((type: any) => type._id === res._id).files =
                    res.files;
                this.setSectionStatus(this.entityDocs);
            });

            this.cddServiceService.stepperIndex.subscribe((res: any) => {
                this.stepperIndex = res;
            });

            this.connectedIndividualsService.connctedIndividualStepperStatus.subscribe(
                (res: any) => {}
            );
        }, 600);
    }

    ngDoCheck() {
        this.checkIfAllStepsAreComplete();
    }
    checkIfAllStepsAreComplete() {
        const result = this.entityDocs.every((e: any) => {
            return e.completed === true || e.completed === 'empty';
        });
        if (result) {
            this.allStepsvalid = true;
        } else {
            this.allStepsvalid = false;
        }
    }

    move(index: any) {
        console.log('move', index);
        this.selectedIndex = index;
        this.selectedStepObj = this.entityDocs[index];
        this.cddServiceService.setSelectedStepData(this.entityDocs[index]);
        this.stepperIndex = index;
    }

    goForward(stepper: MatStepper) {
        stepper.next();
    }
    goBack(stepper: MatStepper) {
        if (stepper) {
            stepper.previous();
        }
    }
    getCaseData() {
        this.cddServiceService.getCaseById(this.caseId).subscribe((res: any) => {
            this.getEntityFiles(res.result.entity_id);
            this.case = new Case(res.result);
            this.getAllQuestionList();
            this.getAllPeople();
            this.cdRef.markForCheck();
        });
    }

    getEntityFiles(entity_id: string) {
        this.cddServiceService.getDocs(this.caseId, entity_id).subscribe((documents: any) => {
            this.entityDocs = documents.result.entity_documents.map((section: any) => {
                section.completed = false;
                return section;
            });
            this.setSectionStatus(this.entityDocs);
            this.entityDocs[2] = {
                description: null,
                id: 10,
                name: 'Connected Individuals',
                types: documents.result.connected_individuals,
                completed: true
            };
            this.entityDocs.push({
                description: null,
                id: 11,
                name: 'Additional Requests',
                types: this.allQuestionhaveAnswerStatus,
                completed: 'empty'
            });
            this.move(0);
        });
    }

    setSectionStatus(sections: any) {
        const status = sections.map((section: any) => {
            let fileStatus;
            switch (section.name) {
                case 'Connected Individuals':
                    fileStatus = section.types.length > 0;
                    break;
                case 'Additional Requests':
                    fileStatus = true;
                    break;
                default:
                    fileStatus = section.types.every((types: any) => types.files?.length > 0);
                    break;
            }
            section.completed = fileStatus;
            return section;
        });
        this.entityDocs = status;
    }

    openDialog() {
        this.dialog.open(ProgresssummaryComponent, {
            width: '85vw',
            panelClass: 'popup-wrap',
            data: {
                caseId: this.caseId
            }
        });
    }
    addtionalRequestStepperStatus(res: any) {
        this.addtionalRequestValid = res;
    }
    getAllQuestionList() {
        const payload = {
            entity_id: this.case.entity_id
        };
        this.kycService.getAllQuestions(payload).subscribe((res: any) => {
            this.allQuestionhaveAnswerStatus = res.result.filter((item: any) => !item.answer);
        });
    }

    getAllPeople(filter?: any) {
        this.connectedIndividualsService
            .getAllIndividuals(this.case?.entity_id, filter)
            .subscribe((people: any) => {
                this.connectedIndividuals = people.result;
                if (this.connectedIndividuals.length > 1) {
                    this.connectedIndividualsService.connctedIndividualStepperStatus.next(true);
                } else {
                    this.connectedIndividualsService.connctedIndividualStepperStatus.next(false);
                }
            });
    }
}
