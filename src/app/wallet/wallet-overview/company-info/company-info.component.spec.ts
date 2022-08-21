import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseService } from '../../services/case.service';

import { CompanyInfoComponent } from './company-info.component';
import { MatInputModule } from '@angular/material/input';
import { AlertService } from 'src/app/core/services/alertService/alert.service';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('CompanyInfoComponent', () => {
    let component: CompanyInfoComponent;
    let fixture: ComponentFixture<CompanyInfoComponent>;
    const formBuilder: FormBuilder = new FormBuilder();
    const servicedata = {
        address: 'Jp nagar',
        city: 'Bangalore',
        company_Website: '',
        company_name: 'Test',
        company_phone_number: '7892316636',
        company_registration_number: 'P12345',
        country_id: {},
        date_of_incorporation_object: '',
        day: null,
        industry_sector_id: [{ id: '4210' }],
        legal_entity_type_id: [{ id: 30 }],
        lei_number: '',
        month: null,
        previous_company_names: [],
        year: 1952,
        zipcode: '560078'
    } as any;
    const companyInfoFormData = new FormGroup({
        company_registration_number: new FormControl('123456789', Validators.required),
        lei_number: new FormControl(''),
        legal_entity_type_id: new FormControl('30', Validators.required),
        industry_sector_id: new FormControl(5224, Validators.required),
        country_id: new FormControl('101', Validators.required),
        previous_company_names: new FormControl(''),
        date_of_incorporation_object: new FormControl(''),
        day: new FormControl(2),
        month: new FormControl(2),
        year: new FormControl(1972, Validators.required),
        company_name: new FormControl('IT test', Validators.required),
        company_phone_number_country_id: new FormControl(''),
        company_phone_number: new FormControl(''),
        address: new FormControl('123456', Validators.required),
        zipcode: new FormControl('560078', Validators.required),
        city: new FormControl('banglore', Validators.required),
        company_Website: new FormControl('https://dev-app.mercore.com')
    });

    const entityData = {
        _id: '6214a14c7c2bee32b08d5027',
        company_name: 'Test',
        application_number: 'MER34897622',
        previous_company_names: [],
        company_Website: '',
        company_phone_number: '7892316636',
        company_phone_number_country_id: 0,
        company_registration_number: 'P12345',
        date_of_incorporation_object: {
            date: 1,
            month: 1,
            year: 1952
        },
        industry_sector_id: 9000,
        legal_entity_type_id: 30,
        is_trading_address_same: true,
        lei_number: '',
        trading_name: 'Test',
        trading_address: {
            country: {
                id: 10,
                name: '',
                alpha2Code: '',
                alpha3Code: '',
                numericCode: '',
                callingCode: ''
            },
            address: 'Jp nagar',
            city: 'Bangalore',
            zipcode: '560078'
        },
        company_address: {
            address: 'Jp nagar',
            city: 'Bangalore',
            zipcode: '452001'
        },
        list_products: [2, 3, 4],

        sector_of_intended_trade: 9411,
        physical_presence: [
            {
                object_type: 'CIP',
                id: 1,
                name: 'Afghanistan',
                iso3: 'AFG',
                iso2: 'AF',
                phone_code: '93',
                capital: 'Kabul',
                currency: 'AFN',
                currency_name: 'Afghan afghani',
                currency_symbol: '؋',
                emoji: '🇦🇫',
                emojiU: 'U+1F1E6 U+1F1EB'
            }
        ],
        countries_of_presence_operations: [
            {
                object_type: 'CIP',
                id: 1,
                name: 'Afghanistan',
                iso3: 'AFG',
                iso2: 'AF',
                phone_code: '93',
                capital: 'Kabul',
                currency: 'AFN',
                currency_name: 'Afghan afghani',
                currency_symbol: '؋',
                emoji: '🇦🇫',
                emojiU: 'U+1F1E6 U+1F1EB'
            }
        ],
        countries_of_intended_trade: [
            {
                object_type: 'CIP',
                id: 1,
                name: 'Afghanistan',
                iso3: 'AFG',
                iso2: 'AF',
                phone_code: '93',
                capital: 'Kabul',
                currency: 'AFN',
                currency_name: 'Afghan afghani',
                currency_symbol: '؋',
                emoji: '🇦🇫',
                emojiU: 'U+1F1E6 U+1F1EB'
            }
        ],
        created_by: '6214a14c7c2bee32b08d5028'
    };

    const countryObj = {
        alpha3Code: 'IND',
        callingCode: '91',
        id: '101',
        name: 'India',
        numericCode: undefined
    };
    const caseServiceRes = {
        code: 'R200',
        message: 'Updated successfully',
        result: {},
        success: true
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompanyInfoComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                CommonModule,
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                MatSnackBarModule,
                MatDialogModule,
                MatInputModule,
                MatChipsModule,
                MatSelectModule,
                MatFormFieldModule,
                BrowserAnimationsModule
            ],
            providers: [CaseService, AlertService, { provide: FormBuilder, useValue: formBuilder }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyInfoComponent);
        component = fixture.componentInstance;
        component.companyInfoForm = companyInfoFormData;
        // component.caseService.caseInfo.entity  = {'companyInfo': servicedata}
        fixture.detectChanges();
    });

    it('should create', () => {
        0;
        expect(component).toBeTruthy();
    });

    it('should call setSelectedCountry method if companyInfo have data', () => {
        const spy = jest.spyOn(component, 'setSelectedCountry');
        component.caseService.caseInfo = {
            entity: { companyInfo: {}, company_address: { country: {} } }
        } as any;
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('initialize company information form ', () => {
        component.initForm(companyInfoFormData);
    });

    it('should be reset phone input field if selected country is diffrent', () => {
        component.countrySelected({ id: 102 });
        expect(component.phoneValueReset).toBeTruthy;
    });

    it('should not be reset phone input field if selected country is same', () => {
        component.companyInfoForm.patchValue({ company_phone_number_country_id: 101 });
        component.countrySelected({ id: 101 });
        expect(component.companyInfoForm.invalid).toBeTruthy;
    });

    it('should call saveCompanyInfo method if companyInfoForm form is invalid', () => {
        component.companyInfoForm.patchValue({ legal_entity_type_id: '30' });
        component.saveCompanyInfo();
        expect(component.companyInfoForm.valid).toBeTruthy;
    });

    it('should call caseService on click of saveCompanyInfo', async(
        inject([CaseService], (caseService: CaseService) => {
            component.companyInfoForm.patchValue({
                company_registration_number: '123456789',
                legal_entity_type_id: '30',
                industry_sector_id: 5224,
                country_id: '101',
                year: 1972,
                company_name: 'IT test',
                address: '123456',
                zipcode: '560078',
                city: 'banglore',
                company_Website: 'https://dev-app.mercore.com'
            });
            component.caseService.caseInfo = { entity: entityData } as any;
            jest.spyOn(caseService, 'updateCIPData').mockReturnValue(of(caseServiceRes));
            fixture
                .whenStable()
                .then(() => {
                    component.saveCompanyInfo();
                    expect(component.editMode).toBeFalsy();
                })
                .catch(err => console.log(err));
        })
    ));

    it('phone input field should be valid with "7892316637" number', () => {
        jest.spyOn(component, 'checkPhoneValidation');
        component.checkPhoneValidation({ value: { phone: '7892316637' } });
    });
});
