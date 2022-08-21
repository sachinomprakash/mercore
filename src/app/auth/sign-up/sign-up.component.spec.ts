import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CountrySelectComponent } from 'src/app/utils/common-components/country-select/country-select.component';
import { PhoneInputComponent } from 'src/app/utils/common-components/phone-input/phone-input.component';
import { By } from '@angular/platform-browser';
import { SignUpComponent } from './sign-up.component';
import { UserService } from 'src/app/utils/services/httpServices/user.service';
import { UtilsModule } from 'src/app/utils/utils.module';
import { MaterialModule } from 'src/app/modules/material/material.module';

describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;
    let el: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SignUpComponent, CountrySelectComponent, PhoneInputComponent],
            imports: [
                ReactiveFormsModule,
                MatCardModule,
                MatIconModule,
                MatFormFieldModule,
                BrowserAnimationsModule,
                MatInputModule,
                FormsModule,
                HttpClientModule,
                MatSnackBarModule,
                MatDialogModule,
                RouterTestingModule,
                UtilsModule,
                MaterialModule
            ],
            providers: [UserService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be invalid without value', async () => {
        component.initRegister();
        expect(component.registerForm.invalid).toBeTruthy();
    });

    it('firstName field validity', () => {
        component.registerForm.patchValue({ firstName: 'abc' });
        expect(component.registerForm.get('firstName')!.valid).toBeTruthy();
    });

    it('lastName field validity', () => {
        component.registerForm.patchValue({ lastName: 'Ta' });
        expect(component.registerForm.get('lastName')!.valid).toBeTruthy();
    });

    it('email field validity', () => {
        component.registerForm.patchValue({ email: 'abc@mercore.com' });
        expect(component.registerForm.get('email')!.valid).toBeTruthy();
    });

    it('countryId field validity', () => {
        component.registerForm.patchValue({ countryId: 1 });
        expect(component.registerForm.get('countryId')!.valid).toBeTruthy();
    });

    it('phoneNumber field validity', () => {
        component.registerForm.patchValue({ phoneNumber: 1234567812 });
        expect(component.registerForm.get('phoneNumber')!.valid).toBeTruthy();
    });

    it('termsAgreed field validity', () => {
        component.registerForm.patchValue({ termsAgreed: true });
        expect(component.registerForm.get('termsAgreed')!.valid).toBeTruthy();
    });

    it('privacyPolicy field validity', () => {
        component.registerForm.patchValue({ privacyPolicy: true });
        expect(component.registerForm.get('privacyPolicy')!.valid).toBeTruthy();
    });
    it('form should be valid', () => {
        component.registerForm.patchValue({
            firstName: 'abc',
            lastName: 'Ta',
            email: 'abc@mercore.com',
            countryId: 1,
            phoneNumber: 1234567812,
            termsAgreed: true,
            privacyPolicy: true
        });
        expect(component.registerForm.valid).toBeTruthy();
    });
    it('should call the onSubmit method on click sign up button', async () => {
        fixture.whenStable().then(() => {
            const spy = jest.spyOn(component, 'onSubmit');
            spy.mockReturnValue();
            el = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
            component.registerForm.patchValue({
                firstName: 'abc',
                lastName: 'Ta',
                email: 'abc@mercore.com',
                countryId: 1,
                phoneNumber: 1234567812,
                termsAgreed: true,
                privacyPolicy: true
            });
            el.click();
            expect(spy).toHaveBeenCalled();
        });
    });
    it('should be call auth api on trigger onSubmit method then handle success flow', inject(
        [UserService],
        (userService: UserService) => {
            fixture.whenStable().then(() => {
                const spy = jest.spyOn(userService, 'registerUser');
                // spy.mockReturnValue();
                el = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
                el.click();
                component.onSubmit();
                expect(spy).toHaveBeenCalled();
            });
        }
    ));
});
