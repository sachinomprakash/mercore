import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { CipService } from 'src/app/utils/services/httpServices/cip.service';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { UtilsModule } from 'src/app/utils/utils.module';

import { CompanyInfoComponent } from './company-info.component';

describe('CompanyInfoComponent', () => {
    let component: CompanyInfoComponent;
    let fixture: ComponentFixture<CompanyInfoComponent>;
    let el: HTMLElement;
    const mockData = {
        company_Website: 'abc',
        company_registration_number: '12345',
        lei_number: '34345453453455435435',
        legal_entity_type_id: 1,
        industry_sector_id: 1,
        country_id: 1,
        previous_company_names: ['avc', 'brq'],
        date_of_incorporation_object: { day: 12, month: 2, year: 1980 },
        company_name: 'abc',
        company_phone_number_country_id: 1,
        company_phone_number: 9075695595,
        address: 'abc',
        zipcode: '560003',
        city: 'abc',
        year: 1980
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompanyInfoComponent],
            imports: [
                ReactiveFormsModule,
                MatFormFieldModule,
                BrowserAnimationsModule,
                MatInputModule,
                FormsModule,
                HttpClientModule,
                RouterTestingModule,
                UtilsModule,
                MaterialModule
            ],
            providers: [StaticService, CipService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyInfoComponent);
        component = fixture.componentInstance;
        window.scroll = jest.fn();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call static api on component load', inject(
        [StaticService],
        (staticService: StaticService) => {
            fixture.whenStable().then(() => {
                const spy = jest.spyOn(staticService, 'getCountries');
                const spy1 = jest.spyOn(staticService, 'getLegalEntity');
                const spy2 = jest.spyOn(staticService, 'getIndustrySector');
                expect(spy).toHaveBeenCalled();
                expect(spy1).toHaveBeenCalled();
                expect(spy2).toHaveBeenCalled();
            });
        }
    ));

    it('form should be invalid without value', async () => {
        component.initCompanyForm();
        expect(component.companyInfoForm.invalid).toBeTruthy();
    });

    it('company_Website field validity', () => {
        component.companyInfoForm.patchValue({ company_Website: 'abc' });
        expect(component.companyInfoForm.get('company_Website')!.valid).toBeTruthy();
    });

    it('company_registration_number field validity', () => {
        component.companyInfoForm.patchValue({ company_registration_number: '12345' });
        expect(component.companyInfoForm.get('company_registration_number')!.valid).toBeTruthy();
    });

    it('lei_number field validity', () => {
        component.companyInfoForm.patchValue({ lei_number: '34345453453455435435' });
        expect(component.companyInfoForm.get('lei_number')!.valid).toBeTruthy();
    });

    it('legal_entity_type_id field validity', () => {
        component.companyInfoForm.patchValue({ legal_entity_type_id: 1 });
        expect(component.companyInfoForm.get('legal_entity_type_id')!.valid).toBeTruthy();
    });

    it('industry_sector_id field validity', () => {
        component.companyInfoForm.patchValue({ industry_sector_id: 1 });
        expect(component.companyInfoForm.get('industry_sector_id')!.valid).toBeTruthy();
    });

    it('country_id field validity', () => {
        component.companyInfoForm.patchValue({ country_id: 1 });
        expect(component.companyInfoForm.get('country_id')!.valid).toBeTruthy();
    });

    it('previous_company_names field validity', () => {
        component.companyInfoForm.patchValue({ previous_company_names: ['avc', 'brq'] });
        expect(component.companyInfoForm.get('previous_company_names')!.valid).toBeTruthy();
    });

    it('date_of_incorporation_object field validity', () => {
        component.companyInfoForm.patchValue({
            date_of_incorporation_object: { day: 12, month: 2, year: 1980 }
        });
        expect(component.companyInfoForm.get('date_of_incorporation_object')!.valid).toBeTruthy();
    });

    it('company_name field validity', () => {
        component.companyInfoForm.patchValue({ company_name: 'abc' });
        expect(component.companyInfoForm.get('company_name')!.valid).toBeTruthy();
    });

    it('company_phone_number_country_id field validity', () => {
        component.companyInfoForm.patchValue({ company_phone_number_country_id: 1 });
        expect(
            component.companyInfoForm.get('company_phone_number_country_id')!.valid
        ).toBeTruthy();
    });

    it('company_phone_number field validity', () => {
        component.companyInfoForm.patchValue({ company_phone_number: 9075695595 });
        expect(component.companyInfoForm.get('company_phone_number')!.valid).toBeTruthy();
    });

    it('address field validity', () => {
        component.companyInfoForm.patchValue({ address: 'abc' });
        expect(component.companyInfoForm.get('address')!.valid).toBeTruthy();
    });

    it('zipcode field validity', () => {
        component.companyInfoForm.patchValue({ zipcode: '560003' });
        expect(component.companyInfoForm.get('zipcode')!.valid).toBeTruthy();
    });

    it('city field validity', () => {
        component.companyInfoForm.patchValue({ city: 'abc' });
        expect(component.companyInfoForm.get('city')!.valid).toBeTruthy();
    });
    it('form should be valid', () => {
        component.companyInfoForm.patchValue(mockData);
        expect(component.companyInfoForm.valid).toBeTruthy();
    });

    it('should call the submitForm method on click next button', async () => {
        fixture.whenStable().then(() => {
            const spy = jest.spyOn(component, 'submitForm');
            // spy.mockReturnValue();
            el = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
            component.companyInfoForm.patchValue(mockData);
            el.click();
            expect(spy).toHaveBeenCalled();
        });
    });

    it('should be call auth api on trigger submitForm method then handle success flow', inject(
        [CipService],
        (cipService: CipService) => {
            fixture.whenStable().then(() => {
                const spy = jest.spyOn(cipService, 'addCIP');
                // spy.mockReturnValue();
                el = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
                el.click();
                component.submitForm();
                expect(spy).toHaveBeenCalled();
            });
        }
    ));
});
