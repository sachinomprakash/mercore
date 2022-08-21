import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CaseService } from '../../services/case.service';
import { TradingInfoComponent } from './trading-info.component';

describe('TradingInfoComponent', () => {
    let component: TradingInfoComponent;
    let fixture: ComponentFixture<TradingInfoComponent>;

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

    const caseServiceRes = {
        action: 'edit',
        componentType: 'trad_info'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TradingInfoComponent],
            imports: [
                ReactiveFormsModule,
                HttpClientTestingModule,
                MatSnackBarModule,
                MatDialogModule,
                MatInputModule,
                MatFormFieldModule,
                BrowserAnimationsModule
            ],
            providers: [CaseService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TradingInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call caseService on click of save button', async(
        inject([CaseService], (caseService: CaseService) => {
            component.caseService.caseInfo = { entity: entityData } as any;
            caseService.parentAction.next(caseServiceRes);
            fixture
                .whenStable()
                .then(() => {
                    component.parentActionSubscribe();
                })
                .catch(err => console.log(err));
        })
    ));

    it('should execute selectItemEvent method on check/uncheck any checkbox', () => {
        component.selectItemEvent(
            { event: { isChecked: true, value: 6920, deleteIndex: -1, values: Array(3) } },
            'sector_of_intended_trade'
        );
        expect(component.selectItemEvent).toBeTruthy();
    });

    it('should call addControl Method when user checked any checkbox', () => {
        const spy = jest.spyOn(component, 'addControl');
        component.addControl(1, 'physical_presence');
        expect(spy).toHaveBeenCalled();
    });

    it('tradingInfoForm form should be invalid without value', () => {
        component.initForm();
        component.saveChanges();
        expect(component.tradingInfoForm.invalid).toBeTruthy();
    });

    it('if tradingInfoForm form is valid then caseService will be call', async(
        inject([CaseService], (caseService: CaseService) => {
            const spy = jest.spyOn(caseService, 'updateCIPData').mockReturnValue(
                of({
                    code: 'EK_BO_CIP_102',
                    message: 'success',
                    result: {},
                    success: true
                })
            );
            component.tradingInfoForm.patchValue({
                city: 'bangalore',
                countries_of_intended_trade: [166],
                countries_of_presence_operations: [4],
                physical_presence: [101],
                sector_of_intended_trade: [5811],
                tradingAddress: 'Jp nagar',
                trading_name: 'BP',
                zip: '560078'
            });
            component.caseService.caseInfo = { entity: entityData } as any;
            fixture
                .whenStable()
                .then(() => {
                    component.saveChanges();
                    expect(spy).toHaveBeenCalled();
                    expect(component.tradingInfoForm.valid).toBeFalsy();
                })
                .catch(err => console.log(err));
        })
    ));
});
