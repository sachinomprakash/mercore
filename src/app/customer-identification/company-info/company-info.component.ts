import { debounceTime } from 'rxjs';
import { Country } from '@angular-material-extensions/select-country';
import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternConstants } from 'src/app/utils/constants/patternConstants';
import { monthConstants } from 'src/app/utils/constants/month.constants';
import { CipService } from 'src/app/utils/services/httpServices/cip.service';
import { CIP } from 'src/app/models/cip.model';
import { ZipCodeValidator } from 'src/app/utils/helpers/zip-code.validator';
import { LoaderService } from 'src/app/utils/services/loader/loader.service';
import legalEnitityList from 'src/assets/legal-form.json';
import { defaultLegalForm } from 'src/app/utils/constants/app.constant';
import { KybService } from 'src/app/utils/services/httpServices/kyb.service';
import { GliefApiService } from 'src/app/utils/services/Glief/glief-api.service';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { CommonService } from 'src/app/utils/services/common/common.service';
import _ from 'lodash';
interface Domain {
    value: string;
    viewValue: string;
}
export interface company {
    name: string;
}

@Component({
    selector: 'app-company-info',
    templateUrl: './company-info.component.html',
    styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
    @Input() cipData: CIP;
    @Input() countries: Country[];
    @Output() goBack = new EventEmitter();

    addOnBlur = true;
    companyInfoForm!: FormGroup;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    companys: company[] = [];
    yearOptions: any = [];
    dayOptions: any = [];
    monthOptions: any = [];
    selectedCountry!: any;
    phoneNumberCountry!: any;
    popover = false;
    companyNumberPopover: boolean;
    companyNumberPopover2: boolean;
    prevCompanyPopover: boolean;
    legalEnitityArr: any = [];
    industrySectorArr: any = [];
    legalEnitityListValue: any = {};
    legalEnitityJsonObj: any;
    companyInfo: any;
    gliefItems: any = [];
    @Output() infoFormValid = new EventEmitter<any>();
    hideLeiDropdown: boolean;
    showLoader: boolean;
    chipLength: number;
    searchPlaceholder: 'Search';
    searchIndustry: any;
    searchLegalFormText: any;
    showCrossIcon: boolean;
    constructor(
        private staticService: StaticService,
        private alertService: AlertService,
        private eRef: ElementRef,
        private cipService: CipService,
        private fb: FormBuilder,
        private loaderService: LoaderService,
        private kybService: KybService,
        private gliefApiService: GliefApiService,
        private commonService: CommonService
    ) {}
    ngOnInit(): void {
        this.legalEnitityJsonObj = legalEnitityList;
        this.legalEnitityDataPopulate();
        this.initSelectedCountry();
        this.getLegalEntities();
        this.getIndustrySector();
        this.initCompanyForm();
        this.populateYear();
        this.getDaysInMonth(1);
        window.scroll(0, 0);
    }

    initSelectedCountry() {
        if (this.cipData?.company_phone_number_country_id) {
            this.phoneNumberCountry = this.countries.find(
                (obj: any) => obj.id == this.cipData.company_phone_number_country_id
            );
        }
        if (this.cipData?.company_address) {
            this.selectedCountry = this.countries.find(
                (obj: any) => obj.id == this.cipData.company_address.country
            );
            this.legalEnitityDataPopulate();
        }
    }
    populateYear() {
        const currentYear = new Date().getFullYear();
        let arr: any = [];
        for (let i = 1400; i <= currentYear; i++) {
            arr.push({ value: i, viewValue: `${i}` });
            this.yearOptions = arr.sort((a: any, b: any) => b.value - a.value);
            // .push({ value: i, viewValue: i });
        }
        this.monthOptions = monthConstants;
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

    initCompanyForm() {
        this.companyInfoForm = this.fb.group({
            company_registration_number: [
                this.cipData?.company_registration_number || '',
                [Validators.required, Validators.minLength(2)]
            ],
            lei_number: [
                this.cipData?.lei_number || '',
                Validators.pattern(PatternConstants.leiNumber)
            ],
            legal_entity_type_id: [this.cipData?.legal_entity_type_id || ''],
            industry_sectors: [this.cipData?.industry_sectors || [], Validators.required],
            country_id: [this.cipData?.company_phone_number_country_id || '', Validators.required],
            previous_company_names: [this.cipData?.previous_company_names || []],
            date_of_incorporation_object: [this.cipData?.date_of_incorporation_object || ''],
            day: [this.cipData?.date_of_incorporation_object?.date || ''],
            month: [this.cipData?.date_of_incorporation_object?.month || ''],
            year: [this.cipData?.date_of_incorporation_object?.year || '', Validators.required],
            company_name: [
                this.cipData?.company_name || '',
                [Validators.required, Validators.minLength(2)]
            ],
            company_phone_number_country_id: [this.cipData?.company_phone_number_country_id || ''],
            domain: [''],
            company_phone_number: [this.cipData?.company_phone_number || ''],
            address: [
                this.cipData?.company_address.address || '',
                [Validators.required, Validators.minLength(2)]
            ],
            zipcode: [this.cipData?.company_address.zipcode || '', Validators.required],
            city: [
                this.cipData?.company_address.city || '',
                [Validators.required, Validators.minLength(2)]
            ],
            company_Website: [
                this.cipData?.company_Website || '',
                Validators.pattern(PatternConstants.website)
            ],
            legal_entity_form_id: [this.cipData?.legal_entity_form_id, Validators.required]
        });
        this.companyInfoForm.patchValue({ domain: 'https://' });
        if (this.cipData) {
            this.companys = this.cipData.previous_company_names.map((company: any) => {
                return { name: company };
            });
        }
    }

    countrySelected(country: any) {
        this.selectedCountry = country;
        this.addZipCodeValidation(country);
        this.legalEnitityDataPopulate();
        this.companyInfoForm.patchValue({ country_id: country.id });
        this.companyInfoForm.patchValue({ company_phone_number_country_id: country.id });
    }
    addZipCodeValidation(country: Country) {
        let newregex = new RegExp('');
        const regex = ZipCodeValidator.checkCountryZip(country.alpha2Code);
        newregex = regex ? regex : new RegExp('');
        this.companyInfoForm.controls['zipcode'].reset();
        this.companyInfoForm.controls['zipcode'].setValidators([
            Validators.required,
            Validators.pattern(newregex)
        ]);
    }

    legalEnitityDataPopulate() {
        this.legalEnitityListValue = [];
        if (this.selectedCountry?.id) {
            this.staticService.getLegalFormData(this.selectedCountry?.id).subscribe((res: any) => {
                this.legalEnitityListValue = res.result.map((legalForm: any) =>
                    this.mapLegalFormValue(legalForm)
                );
            });
        }
    }
    mapLegalFormValue(legalForm: any) {
        return {
            viewValue: legalForm.name,
            value: legalForm.legal_entity_form_id
        };
    }

    checkPhoneValidation(ev: any): any {
        this.companyInfoForm.patchValue({ company_phone_number: ev.value.phone });
    }

    public errorHandling = (control: string, error: string) => {
        return this.companyInfoForm.controls[control].hasError(error);
    };

    add(event: MatChipInputEvent): void {
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

    remove(company: company): void {
        const index = this.companys.indexOf(company);
        if (index >= 0) {
            this.companys.splice(index, 1);
        }
        this.companyInfoForm.patchValue({
            previous_company_names: this.companys.map(obj => obj.name)
        });
    }
    getCountries() {
        this.staticService.getCountries().subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError
        });
    }
    getLegalEntities() {
        this.staticService.getLegalEntity().subscribe((res: any) => {
            this.legalEnitityArr = res.result.map((entity: any) => this.mapEntityValue(entity));
        });
    }
    getIndustrySector() {
        this.staticService.getIndustrySector().subscribe((res: any) => {
            this.industrySectorArr = res.result.map((entity: any) => this.mapEntityValue(entity));
        });
    }
    mapEntityValue(entity: any) {
        return {
            viewValue: entity.name,
            value: entity.id
        };
    }
    handleResponse(response: any) {
        this.countries = response.result.map((country: any) => this.mapCountry(country));
        if (this.cipData.company_phone_number_country_id) {
            this.phoneNumberCountry = this.countries.find(
                (obj: any) => obj.id == this.cipData.company_phone_number_country_id
            );
        }
        if (this.cipData.company_address) {
            this.selectedCountry = this.countries.find(
                (obj: any) => obj.id == this.cipData.company_address.country
            );
        }
    }

    handleError(error: any) {
        console.log(error);
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

    submitForm() {
        // this.loaderService.show();
        this.cipService.addCIP(this.companyInfoForm.value, '2').subscribe(
            (response: any) => {
                this.cipService.syncCipData.next(true);
                this.infoFormValid.emit({ valid: true });
                this.loaderService.hide();
            },
            err => this.loaderService.hide()
        );
    }
    showPopover(state: any) {
        this.popover = state;
    }
    back() {
        this.goBack.emit();
    }
    get constrols() {
        return this.companyInfoForm.controls;
    }
    getValue(event: Event): string {
        return (event.target as HTMLInputElement).value;
    }
    fetchKompanyData(event: Event, key: string, type: string) {
        if (!this.selectedCountry?.alpha2Code) return;

        const payload = {
            type: type,
            [key]: this.getValue(event),
            countryName: this.selectedCountry.name,
            countryCode: this.selectedCountry.alpha2Code
        };

        this.kybService
            .getCompanyInfo(payload, this.cipData._id)
            .pipe(debounceTime(2000))
            .subscribe(
                (res: any) => {
                    this.companyInfo = res?.result;
                    if (this.companyInfo) {
                        this.companyInfoForm.patchValue({
                            company_name: this.companyInfo.company_name
                                ? this.companyInfo.company_name
                                : ''
                        });
                        this.companyInfoForm.patchValue({
                            address: this.companyInfo.address ? this.companyInfo.address : ''
                        });
                    }
                },
                error => {
                    if (error.status == 500) {
                        this.companyInfoForm.patchValue({ company_name: '' });
                        this.companyInfoForm.patchValue({ address: '' });
                    }
                }
            );
    }

    fetchGliefData() {
        this.showLoader = true;
        this.companyInfoForm.value.lei_number &&
            this.gliefApiService
                .getAutocompleteData(this.companyInfoForm.value.lei_number)
                .pipe(debounceTime(2000))
                .subscribe(
                    (res: any) => {
                        this.hideLeiDropdown = true;
                        this.showLoader = false;
                        this.gliefItems = res.data
                            .map((item: any) => {
                                if (item.relationships) {
                                    item.relationships['lei-records'].name = item.attributes;
                                    return item.relationships['lei-records'];
                                }
                            })
                            .filter((element: any) => {
                                return element !== undefined;
                            });
                    },
                    (err: any) => {
                        this.alertService.openSnackBar(err.statusText, 'error');
                    }
                );
    }
    setLeiNumber(value: any) {
        this.companyInfoForm.patchValue({ lei_number: value });
        this.hideLeiDropdown = false;
    }
    clearInput() {
        this.companyInfoForm.patchValue({ lei_number: '' });
    }

    selectValid(ev: any, type: string) {
        console.log(ev);

        switch (type) {
            case 'industry':
                if (!ev || ev?.length === 0) {
                    this.showCrossIcon = false;
                } else {
                    this.showCrossIcon = true;
                    this.companyInfoForm.patchValue({ industry_sectors: _.map(ev, 'value') });
                }
                break;
            case 'legalEntity':
                if (ev) {
                    this.companyInfoForm.patchValue({ legal_entity_form_id: ev.value });
                }
                break;
            case 'year':
                if (ev) {
                    this.companyInfoForm.patchValue({ year: ev.value });
                }
                break;
            default:
                break;
        }
    }
}
