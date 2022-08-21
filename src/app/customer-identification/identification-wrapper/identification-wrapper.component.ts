import { CdkStepper, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CIP } from 'src/app/models/cip.model';
import { CipService } from 'src/app/utils/services/httpServices/cip.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { Country } from '@angular-material-extensions/select-country';
import { ActivatedRoute, Router } from '@angular/router';
import { modulePath } from 'src/app/utils/constants/route.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
@Component({
    selector: 'app-identification-wrapper',
    templateUrl: './identification-wrapper.component.html',
    styleUrls: ['./identification-wrapper.component.scss'],
    providers: [
        { provide: CdkStepper },
        { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } }
    ]
})
export class IdentificationWrapperComponent implements OnInit {
    countries: Country[];
    isLinear = true;
    selectedIndex = 0;
    thankyou = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    editable: boolean;
    cipData: CIP;
    completeStepper = false;
    stateStepper: string;
    cipStage: number;

    constructor(
        private _formBuilder: FormBuilder,
        private cipService: CipService,
        private staticService: StaticService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private alertService: AlertService
    ) {}
    ngOnInit(): void {
        this.activatedRoute.data.subscribe({
            next: (response: any) => {
                if (response.cipData.stage >= 3) {
                    localStorage.setItem('stage', '3');
                    this.router.navigateByUrl(`/${modulePath.home}`);
                } else {
                    localStorage.setItem('stage', '0');
                    this.editable = true;
                    this.getCountries();
                    this.cipSyncSubscribe();
                    this.cipData = new CIP(response.cipData);
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
            }
        });
    }
    getCIPData() {
        this.cipService.getCIPData().subscribe({
            next: res => {
                this.cipData = new CIP(res.result || {});
            },
            error: err => {
                this.cipData = new CIP({});
            }
        });
    }

    cipSyncSubscribe() {
        this.cipService.syncCipData.subscribe({
            next: (status: boolean) => {
                if (status) {
                    this.getCIPData();
                }
            }
        });
    }

    getCountries() {
        this.staticService.getCountries().subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError
        });
    }
    handleResponse(response: any) {
        this.countries = response.result.map((country: any) => this.mapCountry(country));
    }
    mapCountry(country: any) {
        return {
            id: country.id,
            name: country.name,
            alpha2Code: country.iso2,
            alpha3Code: country.iso3,
            numericCode: country.numeric_code,
            callingCode: country.phone_code
        };
    }

    handleError(error: any) {
        console.log(error);
    }
    move(index: any) {
        this.selectedIndex = index;
    }

    requestFormValid(ev: any) {
        this.firstFormGroup.patchValue({ firstCtrl: true });
    }

    infoFormValid(ev: any) {
        this.secondFormGroup.patchValue({ secondCtrl: true });
    }

    tradeFormValid(ev: any) {
        this.thirdFormGroup.patchValue({ thirdCtrl: true });
        this.editable = false;
        this.completeStepper = true;
        this.stateStepper = 'done';
    }

    goForward(stepper: MatStepper) {
        stepper.next();
        this.getCIPData();
    }
    goBack(stepper: MatStepper) {
        stepper.previous();
    }
    showToast() {
        this.alertService.openSnackBar('Coming Soon', '');
    }
}
