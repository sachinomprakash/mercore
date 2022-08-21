import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import { monthConstants } from 'src/app/core/constant/month.contant';
// import {
//   Case,
//   CIPOverviewComponent,
//   OverviewAction,
// } from 'src/app/core/models/cip.model';
// import { PatternConstants } from 'src/app/core/utils/common/common.module';
// import { CaseService } from '../../services/case.service';
import { MatChipInputEvent } from '@angular/material/chips';
// import { ZipCodeValidator } from 'src/app/core/utils/zip-code.validator';
// import {
//   AlertService,
//   MessageType,
// } from 'src/app/core/services/alertService/alert.service';
import { Subscription } from 'rxjs';
import { Country } from '@angular-material-extensions/select-country';
import { PatternConstants } from 'src/app/utils/constants/patternConstants';
import { ZipCodeValidator } from 'src/app/utils/helpers/zip-code.validator';
import { monthConstants } from 'src/app/utils/constants/month.constants';
import { PhoneInputComponent } from 'src/app/utils/common-components/phone-input/phone-input.component';
// import { KybService } from 'src/app/core/services/httpServices/kyb.service';
// import { PhoneInputComponent } from 'src/app/shared/phone-input/phone-input.component';
// import { GliefApiService } from 'src/app/core/services/glief-api/glief-api.service';
// import { StaticService } from 'src/app/core/services/httpServices/static.service';
@Component({
    selector: 'app-company',
    templateUrl: './company-info.component.html',
    styleUrls: ['./company-info.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {
    @Output() onSaveChanges = new EventEmitter();
    @Input() companyInfo: any;
    editMode: boolean = false;
    isSubmit: boolean;
    discard: boolean;
    save: boolean;
    countries: any[] = [];
    legalEnitityArr: any[] = [];
    legalEnitityListValue: any[] = [];
    industrySectorArr: any[] = [];
    companys: any[] = [];
    dayOptions: any;
    monthOptions: any;
    phonetocuhed = false;
    countrytocuhed = false;
    yearOptions: any = [];
    selectedCountry: any;
    companyInfoForm: FormGroup;
    unsubscribe: Subscription;
    phoneValueReset: boolean;
    isPhoneNumberValid = true;
    phoneValueRequired: boolean;
    // companyInfo: any;
    @ViewChild(PhoneInputComponent) phoneInput: any;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    hideLeiDropdown: boolean;
    gliefItems: any = [];
    showLoader: boolean;
    chipLength: number;
    constructor(
        private fb: FormBuilder // public caseService: CaseService, // private alertService: AlertService, // private kybService: KybService, // private gliefApiService: GliefApiService, // private alterService: AlertService, // private staticService: StaticService
    ) {}

    ngOnInit(): void {
        console.log('---------------', this.companyInfo);

        this.isPhoneNumberValid = true;
        this.initForm(this.companyInfo);
        this.companyInfoForm.disable();
        this.setSelectedCountry();
        // if (this.entityData.companyInfo) {
        // }
        this.populateYear();
        this.getDaysInMonth(1);

        if (this.companyInfo?.company_address?.country) {
            this.addZipCodeValidation(this.companyInfo?.company_address?.country);
        }
    }
    setSelectedCountry() {
        this.selectedCountry = this.companyInfo.company_address.country;
        // this.getLegalFormValues(this.selectedCountry.id);
    }
    // parentActionSubscribe() {
    //   this.unsubscribe = this.caseService.parentAction.subscribe({
    //     next: (res: any) => {
    //       if (res.componentType == CIPOverviewComponent.companyInfo) {
    //         this.editMode = res.action == OverviewAction.edit;
    //         this.discard = res.action == OverviewAction.discard;
    //         this.save = res.action == OverviewAction.save;
    //         if (this.discard) {
    //           this.editMode = false;
    //           this.companyInfoForm.disable();
    //           this.phoneValueReset = true;
    //           this.initForm(this.caseService.caseInfo?.entity?.companyInfo);
    //           this.setSelectedCountry();
    //         } else if (this.editMode) {
    //           this.editMode = true;
    //           this.companyInfoForm.enable();
    //         } else if (this.save) {
    //           this.saveCompanyInfo();
    //           this.editMode = true;
    //         }
    //       }
    //     },
    //   });
    // }
    initForm(dataToPopulate?: any) {
        this.companyInfoForm = this.fb.group({
            company_registration_number: ['', [Validators.required, Validators.minLength(2)]],
            lei_number: ['', Validators.pattern(PatternConstants.leiNumber)],
            legal_entity_type_id: [''],
            legal_entity_form_id: ['', Validators.required],
            industry_sector_id: ['', Validators.required],
            country_id: ['', Validators.required],
            previous_company_names: [],
            date_of_incorporation_object: [''],
            day: [''],
            month: [''],
            year: ['', Validators.required],
            company_name: ['', [Validators.required, Validators.minLength(2)]],
            company_phone_number_country_id: [''],
            company_phone_number: [''],
            address: ['', [Validators.required, Validators.minLength(2)]],
            zipcode: ['', Validators.required],
            city: ['', [Validators.required, Validators.minLength(2)]],
            company_Website: ['']
        });
        if (
            dataToPopulate['legal_entity_type_id'] &&
            dataToPopulate['legal_entity_type_id'].length
        ) {
            dataToPopulate.legal_entity_type_id = dataToPopulate['legal_entity_type_id'][0]?.id;
        }
        if (dataToPopulate['industry_sector_id'] && dataToPopulate['industry_sector_id'].length) {
            dataToPopulate.industry_sector_id = dataToPopulate['industry_sector_id'][0]?.id;
        }
        if (dataToPopulate.legal_entity_form_id) {
            dataToPopulate.legal_entity_form_id =
                dataToPopulate.legal_entity_form_id?.legal_entity_form_id;
        }
        this.companyInfoForm.patchValue(dataToPopulate);
        if (dataToPopulate.previous_company_names && dataToPopulate.previous_company_names.length) {
            this.companys = dataToPopulate.previous_company_names.map((val: string) => ({
                name: val
            }));
        }
        console.log('this.companyInfoForm.value------', this.companyInfoForm.value);
    }
    get constrols() {
        return this.companyInfoForm.controls;
    }
    errorHandling(controlName: string, error: string) {
        return this.constrols[controlName].hasError(error);
    }
    getDaysInMonth(ev: any) {
        const date = new Date(2001, ev, 0).getDate();
        const dayArr = [];
        for (let i = 1; i <= date; i++) {
            i.toString().length === 1
                ? dayArr.push({ value: i, viewValue: '0' + i })
                : dayArr.push({ value: i, viewValue: i });
        }
        this.dayOptions = dayArr;
    }
    // countrySelected(country: any) {
    //   const countryObj = { ...this.companyInfoForm.value }
    //   if (countryObj.company_phone_number_country_id != country.id) {
    //     this.phoneValueReset = true;
    //     this.isPhoneNumberValid = true;
    //   } else {
    //     this.phoneValueReset = false;
    //   }
    //   this.selectedCountry = country;
    //   this.getLegalFormValues(country.id);
    //   this.addZipCodeValidation(country);
    //   this.companyInfoForm.controls['zipcode'].reset();
    //   this.companyInfoForm.patchValue({ country_id: { id: country.id } });
    //   this.companyInfoForm.patchValue({
    //     company_phone_number_country_id: country.id,
    //   });
    //   this.companyInfoForm.controls['zipcode'].markAsTouched();
    //   this.phoneInput.phoneForm.markAsUntouched();
    // }
    addZipCodeValidation(country: Country) {
        let newregex = new RegExp('');
        const regex = ZipCodeValidator.checkCountryZip(country.alpha2Code);
        newregex = regex ? regex : new RegExp('');
        this.companyInfoForm.controls['zipcode'].setValidators([
            Validators.required,
            Validators.pattern(newregex)
        ]);
    }
    populateYear() {
        const currentYear = new Date().getFullYear();
        for (let i = 1950; i <= currentYear; i++) {
            this.yearOptions.push({ value: i, viewValue: i });
        }
        this.monthOptions = monthConstants;
    }
    removePrevCompanyName(company: any): void {
        const index = this.companys.indexOf(company);
        if (index >= 0) {
            this.companys.splice(index, 1);
        }
        this.companyInfoForm.patchValue({
            previous_company_names: this.companys.map(obj => obj.name)
        });
    }
    addPrevCompanyName(event: MatChipInputEvent): void {
        this.chipLength = event.value.length;
        if (this.chipLength > 1 && this.chipLength <= 256) {
            const value = (event.value || '').trim();
            // Add our company
            if (value) {
                this.companys.push({ name: value });
            }
            // Clear the input value
            event.chipInput!.clear();
            this.companyInfoForm.patchValue({
                previous_company_names: this.companys.map(obj => obj.name)
            });
        }
    }
    focusFunction(e: any) {
        this.countrytocuhed = true;
    }
    // saveCompanyInfo() {
    //   if (this.companyInfoForm.invalid || !this.isPhoneNumberValid) {
    //     return;
    //   }
    //   const data = {
    //     ...this.companyInfoForm.value,
    //     country_id: this.companyInfoForm.value.country_id.id,
    //   };

    //   // this.caseService
    //   //   .updateCIPData(this.caseService.caseInfo.entity._id, data, '2')
    //   //   .subscribe({
    //   //     next: (res) => {
    //   //       this.editMode = false;
    //   //       this.alertService.openSnackBar(res.message, MessageType.success);
    //   //       this.companyInfoForm.disable();
    //   //       this.onSaveChanges.emit(true);
    //   //       //TODO: Temp Sync
    //   //       this.caseService
    //   //         .getCaseData(this.caseService.caseInfo.internal_id)
    //   //         .subscribe({
    //   //           next: (res) => {
    //   //             this.caseService.caseInfo = new Case(res.result);
    //   //           },
    //   //         });
    //   //     },
    //   //   });
    // }
    checkPhoneValidation(ev: any): any {
        this.phonetocuhed = true;
        this.isPhoneNumberValid = ev.valid;
        if (ev.value && ev.value.phone) {
            this.companyInfoForm.patchValue({ company_phone_number: ev.value.phone });
        }
    }
    ngOnDestroy(): void {
        if (this.unsubscribe) {
            this.unsubscribe.unsubscribe();
        }
    }
    getValue(event: Event): string {
        return (event.target as HTMLInputElement).value;
    }
    // fetchCompanyData(event: Event, key: string, type: string) {
    //   if (!this.selectedCountry?.alpha2Code) return;
    //   const payload = {
    //     type: type,
    //     [key]: this.getValue(event),
    //     countryName: this.selectedCountry.name,
    //     countryCode: this.selectedCountry.alpha2Code
    //   };
    //   this.kybService
    //     .getCompanyInfo(payload)
    //     .pipe(debounceTime(2000))
    //     .subscribe((res: any) => {
    //       this.companyInfo = res?.result;
    //       if (this.companyInfo) {
    //         this.companyInfoForm.patchValue({
    //           company_name: this.companyInfo.companyName
    //             ? this.companyInfo.companyName
    //             : ''
    //         });
    //         this.companyInfoForm.patchValue({
    //           address: this.companyInfo.address ? this.companyInfo.address : ''
    //         });
    //       }

    //     },
    //       error => {
    //         if (error.status == 500) {
    //           this.companyInfoForm.patchValue({ company_name: '' });
    //           this.companyInfoForm.patchValue({ address: '' });
    //         }
    //       });
    // }
    // fetchGliefData() {
    //   this.showLoader = true;
    //   this.companyInfoForm.value.lei_number &&
    //     this.gliefApiService
    //       .getAutocompleteData(this.companyInfoForm.value.lei_number)
    //       .pipe(debounceTime(2000))
    //       .subscribe(
    //         (res: any) => {
    //           this.hideLeiDropdown = true;
    //           this.showLoader = false;
    //           this.gliefItems = res.data
    //             .map((item: any) => {
    //               if (item.relationships) {
    //                 item.relationships['lei-records'].name = item.attributes;
    //                 return item.relationships['lei-records'];
    //               }
    //             })
    //             .filter((element: any) => {
    //               return element !== undefined;
    //             });
    //         },
    //         (err: any) => {
    //           this.alterService.openSnackBar(err.statusText, MessageType.error);
    //         }
    //       );
    // }
    setLeiNumber(value: any) {
        this.companyInfoForm.patchValue({ lei_number: value });
        this.hideLeiDropdown = false;
    }
    clearInput() {
        this.companyInfoForm.patchValue({ lei_number: '' });
    }

    // getLegalFormValues(countryId: number) {
    //   this.staticService.getLegalFormData(countryId).subscribe((res: any) => {
    //     this.legalEnitityListValue = res.result;
    //   });
    // }
}
