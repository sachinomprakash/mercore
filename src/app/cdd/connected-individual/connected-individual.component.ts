import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { modulePath } from 'src/app/utils/constants/route.constant';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConnectedIndividualsService } from 'src/app/utils/services/httpServices/connected-individuals/connected-individuals.service';
import { PersonModel } from 'src/app/models/cdd.model';
import { tables } from 'src/app/utils/constants/app.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { MatStepper } from '@angular/material/stepper';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import _ from 'lodash';
import { DocumentService } from 'src/app/utils/services/docService/document.service';

@Component({
    selector: 'app-connected-individual',
    templateUrl: './connected-individual.component.html',
    styleUrls: ['./connected-individual.component.scss']
})
export class ConnectedIndividualComponent implements OnInit, OnChanges {
    @Input() entityId: string;
    @Input() formId: number;
    header = tables.people;
    isLinear = true;
    cardSwitch: boolean = true;
    selectedIndex: number = 0;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    personDetails: PersonModel;
    editable: boolean;
    stepperActive: boolean;
    sourcesWealthStepperActive: boolean;
    connectedIndividuals: Array<PersonModel>;
    personDocs: any;
    showAdd = false;
    // showThankYou: boolean = false;
    subText: string;
    heading: string;
    @ViewChild('individualStepper') stepper: any;
    activePerson: PersonModel;
    roles: any = [];

    constructor(
        private _formBuilder: FormBuilder,
        private connectedIndividualsService: ConnectedIndividualsService,
        public commonservice: CommonService,
        private documentService: DocumentService,
        private staticService: StaticService,
        private router: Router,
        private alertService: AlertService,
        public dialog: MatDialog // private bottomSheet: MatBottomSheet
    ) {}

    ngOnInit(): void {
        this.subText =
            'In order to proceed, please click on (Add Individual) to start adding connected Individuals.';
        this.heading = 'Connected individuals';
        this.editable = true;
        this.getAllPeople();
        this.initializeFormGroup();
        this.getAllRoles();
        this.documentService.userDocUploaded.subscribe((res: any) => {
            // this.personDocs.files.filter((files:any) =>{ files._id})
            this.personDocs.files = this.personDocs.files.map((x: any) =>
                x._id === res._id ? { ...res } : x
            );
        });
    }

    getAllRoles() {
        this.staticService.getRoles(this.formId).subscribe((res: any) => {
            res.result.push({ personRoleMaster: { name: 'All' }, personRoleId: null });
            this.roles = res.result.map((role: any) => this.mapRoleValue(role));
        });
    }
    mapRoleValue(role: any) {
        return {
            viewValue: role.personRoleMaster.name,
            value: role.personRoleId
        };
    }
    getFilteredValue(ev: any) {
        this.getAllPeople(ev);
    }

    initializeFormGroup() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: [false, Validators.requiredTrue]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: [false, Validators.requiredTrue]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: [false, Validators.requiredTrue]
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.connectedIndividualsService.IndividualStepperActive.subscribe((res: any) => {
            if (res) {
                this.stepperActive = res;
            } else {
                this.stepperActive = false;
            }
        });
        this.connectedIndividualsService.docComplete.subscribe((res: any) => {
            // if (this.stepperActive) {
            //     this.heading = 'Adding Connected Individuals';
            //     this.subText = '';
            //     this.addDocFormValid(res, this.stepper);
            // } else {
            this.heading = 'Adding Connected Individuals';
            this.subText = '';
            // this.showThankYou = true;
            this.hideStepper();
            // }
        });
        this.connectedIndividualsService.sowComplete.subscribe((res: any) => {
            // this.showThankYou = true;
            this.hideStepper();
        });
    }

    getAllPeople(filter?: any) {
        this.connectedIndividualsService
            .getAllIndividuals(this.entityId, filter)
            .subscribe((people: any) => {
                this.connectedIndividuals = people.result;

                if (this.connectedIndividuals.length > 0) {
                    this.connectedIndividualsService.connctedIndividualStepperStatus.next(true);
                } else {
                    this.connectedIndividualsService.connctedIndividualStepperStatus.next(false);
                }
            });
    }

    showAddInd() {
        this.showAdd = !this.showAdd;
        this.subText = '';
        this.initializeFormGroup();
        this.stepperActive = false;
        this.selectedIndex = 0;
        this.personDetails = new PersonModel({});
    }

    forward() {
        this.commonservice.moveStep({ move: true });
    }

    back() {
        if (this.showAdd) {
            this.showAdd = !this.showAdd;
            this.selectedIndex = 0;
            // this.showThankYou = false;
            this.getAllPeople();
            this.initializeFormGroup();
        } else {
            this.commonservice.moveStep({ move: false });
        }
        this.subText =
            'In order to proceed, please click on (Add Individual) to start adding connected Individuals.';
        this.heading = 'Connected individuals';
    }

    returnHome() {
        this.router.navigateByUrl(`/${modulePath.home}`);
    }

    move(index: any) {
        this.selectedIndex = index;
    }

    addInfoFormValid(ev: any, stepper: MatStepper) {
        this.firstFormGroup.patchValue({ firstCtrl: true });
        this.subText = 'In order to proceed, please provide the following documentation.';
        this.heading = `Identity Verification for ${ev.person.first_name +
            ' ' +
            ev.person.middle_name +
            ' ' +
            ev.person.last_name}`;
        this.getPersonDocs(ev.person);
        setTimeout(() => {
            stepper.next();
        }, 500);
    }

    addDocFormValid(ev: any, stepper: MatStepper) {
        this.secondFormGroup.patchValue({ secondCtrl: true });
        this.getPersonDocs(this.personDetails);
        stepper.next();
    }

    tableAction(ev: any) {
        switch (ev.actionType) {
            case 'Edit':
                this.personDetails = ev.record;
                this.showAdd = !this.showAdd;
                this.getPersonDocs(ev.record);
                break;
            case 'Delete':
                this.alertService
                    .openConfirmDialog(
                        `Are you sure you want to remove ${ev.record.first_name +
                            ' ' +
                            ev.record.last_name}`,
                        'Yes',
                        'Cancel'
                    )
                    .subscribe((res: any) => {
                        res &&
                            this.connectedIndividualsService
                                .deleteIndividual(ev.record._id)
                                .subscribe({
                                    next: () => {
                                        this.connectedIndividuals = this.connectedIndividuals.filter(
                                            (obj: any) => obj._id != ev.record._id
                                        );
                                        if (this.connectedIndividuals.length > 1) {
                                            this.connectedIndividualsService.IndividualStepperActive.next(
                                                true
                                            );
                                        } else {
                                            this.connectedIndividualsService.IndividualStepperActive.next(
                                                false
                                            );
                                        }
                                    },
                                    error: err => {
                                        this.alertService.openSnackBar(err.error.message, 'error');
                                    }
                                });
                    });
                break;
            default:
                break;
        }
    }
    getPersonDocs(details: PersonModel) {
        this.connectedIndividualsService
            .getIndividualDocs(details.entity_id, details._id)
            .subscribe(res => {
                // const activateStep3 = res.result.roles.find((x: any) => x.id === 1);
                // activateStep3
                //     ? (this.sourcesWealthStepperActive = true)
                //     : (this.sourcesWealthStepperActive = false);
                res.result.documents.map((result: any) => {
                    result.meta = result.files;
                    return result;
                });
                this.personDocs = { files: res.result.documents };
                this.personDetails = res.result;
            });
    }
    hideStepper() {
        this.showAdd = !this.showAdd;
        // this.showThankYou = !this.showThankYou;
        this.selectedIndex = 0;
        this.initializeFormGroup();
        this.getAllPeople();
        this.subText =
            'In order to proceed, please click on (Add Individual) to start adding connected Individuals.';
        this.heading = 'Connected individuals';
    }
}
