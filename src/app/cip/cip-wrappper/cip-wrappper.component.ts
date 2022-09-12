import { CdkStepper, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CIP, CipStep } from 'src/app/models/cip.model';
import { CipService } from 'src/app/utils/services/httpServices/cip.service';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { Country } from '@angular-material-extensions/select-country';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { cipStepConstants } from 'src/app/utils/constants/steps.constants';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-cip-wrappper',
    templateUrl: './cip-wrappper.component.html',
    styleUrls: ['./cip-wrappper.component.scss'],
    providers: [
        { provide: CdkStepper },
        { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CipWrappperComponent implements OnInit, OnDestroy {
    @ViewChild('stepper') private myStepper: MatStepper;
    formGroup0: FormGroup;
    formGroup1: FormGroup;
    formGroup2: FormGroup;
    formGroup3: FormGroup;
    countries: Country[];
    stages: Array<CipStep>;
    isLinear = true;
    selectedIndex = 0;
    // thankyou = true;
    editable: boolean;
    cipData: CIP;
    // cipStage: number;
    stepSubscription: Subscription;

    constructor(
        private cipService: CipService,
        private _formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private alertService: AlertService
    ) {
        this.initializeFormGroups();
        this.stages = cipStepConstants;
        console.log('call');
    }

    initializeFormGroups() {
        this.formGroup0 = this._formBuilder.group({
            firstCtrl: [false, Validators.requiredTrue]
        });
        this.formGroup1 = this._formBuilder.group({
            secondCtrl: [false, Validators.requiredTrue]
        });
        this.formGroup2 = this._formBuilder.group({
            thirdCtrl: [false, Validators.requiredTrue]
        });
        this.formGroup3 = this._formBuilder.group({
            fourthCtrl: [false, Validators.requiredTrue]
        });
    }

    ngOnInit(): void {
        this.checkRoutePath();
        this.nextClicked();
    }

    ngOnDestroy(): void {
        this.stepSubscription.unsubscribe();
    }

    nextClicked() {
        this.stepSubscription = this.cipService.getMoveToNextStep().subscribe((res: boolean) => {
            this.goForward(this.myStepper);
        });
    }

    checkRoutePath() {
        switch (this.router.url) {
            case '/customer/cip/product-selection':
                this.move(1);
                break;
            case '/customer/cip/company-information':
                this.move(2);
                break;
            case '/customer/cip/trading-information':
                this.move(3);
                break;
            default:
                this.move(0);
                break;
        }
    }

    move(index: number) {
        this.selectedIndex = index;
        this.setEditableSteps(index);
        const stepDetails = this.stages.find((step: CipStep) => {
            return step.index === index;
        });
        this.router.navigate([stepDetails?.route], { relativeTo: this.activatedRoute });
    }

    setEditableSteps(ind: number) {
        for (let index = 0; index < ind; index++) {
            this.stages[index].completed = true;
            this.stages[index].editable = true;
        }
    }

    goForward(stepper: MatStepper) {
        console.log(this.selectedIndex);
        switch (this.selectedIndex) {
            case 0:
                this.formGroup0.patchValue({ firstCtrl: true });
                break;
            case 1:
                this.formGroup1.patchValue({ secondCtrl: true });
                break;
            case 2:
                this.formGroup2.patchValue({ thirdCtrl: true });
                break;
            case 3:
                this.formGroup3.patchValue({ fourthCtrl: true });
                break;
            default:
                break;
        }
        stepper.next();
    }

    showToast() {
        this.alertService.openSnackBar('Coming Soon', '');
    }
}
