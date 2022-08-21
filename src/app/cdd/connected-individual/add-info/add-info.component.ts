import { CdkStepper, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonModel } from 'src/app/models/cdd.model';
import { description } from 'src/app/utils/constants/description.constant';
import { PatternConstants } from 'src/app/utils/constants/patternConstants';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { ConnectedIndividualsService } from 'src/app/utils/services/httpServices/connected-individuals/connected-individuals.service';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
@Component({
    selector: 'app-add-info',
    templateUrl: './add-info.component.html',
    styleUrls: ['./add-info.component.scss'],
    providers: [
        { provide: CdkStepper },
        { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } }
    ]
})
export class AddInfoComponent implements OnInit, OnChanges {
    @Input() entityId: string;
    @Input() formId: number;
    @Input() personInfo: PersonModel;
    @Output() addInfoValid = new EventEmitter<any>();

    infoFormGroup: FormGroup;
    roles: any = [];
    constructor(
        private _formBuilder: FormBuilder,
        private connectedIndividualsService: ConnectedIndividualsService,
        private staticService: StaticService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.staticService.getRoles(this.formId).subscribe((roles: any) => {
            this.roles = this.toggleTooltip(roles.result);
            // this.roles = this.roles.filter((role: any) => role.name !== 'KYC Coordinator');
            if (this.personInfo) {
                this.activateRole(this.personInfo.roles);
            }
        });
        this.initInfoForm();
    }

    ngOnChanges() {
        this.initInfoForm();
    }

    initInfoForm() {
        this.infoFormGroup = this._formBuilder.group({
            first_name: [
                this.personInfo?.first_name || '',
                [Validators.required, Validators.minLength(3), Validators.maxLength(32)]
            ],
            middle_name: [this.personInfo?.middle_name || '', Validators.maxLength(32)],
            last_name: [
                this.personInfo?.last_name || '',
                [Validators.required, Validators.maxLength(32)]
            ],
            email: [
                this.personInfo?.email || '',
                [Validators.required, Validators.pattern(PatternConstants.email)]
            ],
            roles: [this.personInfo?.roles.map((i: any) => i['id']) || '', Validators.required]
        });
    }

    public errorHandling = (control: string, error: string) => {
        return this.infoFormGroup.controls[control].hasError(error);
    };

    toggleTooltip(rolesArr: any) {
        rolesArr.map((item: any) => {
            item.is_active = true;
            switch (item.personRoleMaster.name) {
                case 'Ultimate Beneficial Owner':
                    item.description = description.ubo;
                    break;
                case 'Intermediate Beneficial Owner':
                    item.description = description.ibo;
                    break;
                case 'Significant Controller':
                    item.description = description.sc;
                    break;
                case 'Senior Management':
                    item.description = description.sm;
                    break;
                case 'Senior Management':
                    item.description = description.sm;
                    break;
                case 'Executive Director (or equivalent)':
                    item.description = description.ed;
                    break;
                case 'Other':
                    item.description = description.other;
                    break;
                default:
                    item.description = description.other;
                    break;
            }
        });
        return rolesArr;
    }

    next() {
        if (this.personInfo._id) {
            this.connectedIndividualsService
                .updateIndividual(this.entityId, this.personInfo._id, this.infoFormGroup.value)
                .subscribe({
                    next: res => {
                        this.moveToNextStep(res.result);
                    },
                    error: err => {
                        this.showError(err);
                    }
                });
        } else {
            this.connectedIndividualsService
                .createIndividual(this.entityId, this.infoFormGroup.value)
                .subscribe({
                    next: res => {
                        this.moveToNextStep(res.result);
                    },
                    error: err => {
                        this.showError(err);
                    }
                });
        }
    }

    selectedRole(role: any, ev?: any) {
        ev?.preventDefault();
        this.roles.find(
            (r: any) => r.personRoleId === role.personRoleId
        ).is_active = !role.is_active;
        const filteredArr = this.roles.filter((r: any) => r.is_active === false);
        const pluckedIds = filteredArr.map((i: any) => i['personRoleId']);
        this.infoFormGroup.patchValue({ roles: pluckedIds });
    }

    activateRole(personRole: any) {
        const uniqueResultArray = this.roles.filter((objOne: any) => {
            return personRole.some((objTwo: any) => {
                return objOne.personRoleId == objTwo.personRoleId;
            });
        });
        uniqueResultArray.forEach((resArr: any) => {
            this.selectedRole(resArr);
        });
    }
    moveToNextStep(person: PersonModel) {
        this.addInfoValid.emit({ person });
        const selectedRole = this.infoFormGroup.value.roles.includes(1);
        if (selectedRole) {
            this.connectedIndividualsService.IndividualStepperActive.next(true);
        } else {
            this.connectedIndividualsService.IndividualStepperActive.next(false);
        }
    }
    showError(err: any) {
        this.alertService.openSnackBar(err.error.message, 'error');
    }
}
