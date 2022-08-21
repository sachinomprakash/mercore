import { Country } from '@angular-material-extensions/select-country';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { PatternConstants } from 'src/app/utils/constants/patternConstants';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { UserService } from 'src/app/utils/services/httpServices/user.service';
import { PasswordValidator } from 'src/app/utils/helpers/password-validator';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    isSubmitted = false;
    hide = true;
    registerForm!: FormGroup;
    selectedCountry!: any;
    rememberMe: boolean | undefined;
    countries!: Country[];
    resetPath = `/${modulePath.auth}/${routeConstant.login}`;
    registerPath = `/${modulePath.auth}/${routeConstant.register}`;
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private staticService: StaticService,
        private alertService: AlertService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initRegister();
        this.getCountries();
    }
    getCountries() {
        this.staticService.getCountries().subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError
        });
    }

    initRegister() {
        this.registerForm = this.fb.group({
            firstName: [
                '',
                [Validators.required, Validators.minLength(3), Validators.maxLength(32)]
            ],
            lastName: ['', [Validators.required, Validators.maxLength(32)]],
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(PatternConstants.email),
                    Validators.maxLength(256),
                    PasswordValidator.businessEmail
                ]
            ],
            countryId: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            phoneCountryId: [''],
            termsAgreed: [false, Validators.requiredTrue],
            privacyPolicy: [false]
        });
    }

    countrytocuhed = false;
    countrySelected(country: any) {
        this.selectedCountry = country;
        this.registerForm.patchValue({ countryId: country.id });
        this.registerForm.patchValue({ phoneCountryId: country.id });
    }
    focusFunction(e: any) {
        this.countrytocuhed = true;
    }
    phonetocuhed = false;
    checkPhoneValidation(ev: any): any {
        this.phonetocuhed = true;
        this.registerForm.patchValue({ phoneNumber: ev.value.phone });
    }

    public errorHandling = (control: string, error: string) => {
        return this.registerForm.controls[control].hasError(error);
    };

    onSubmit() {
        // API Call
        if (this.registerForm.invalid) {
            return;
        }
        const payload = {
            ...this.registerForm?.value
        };
        payload.email = payload.email.toLowerCase();
        delete payload.privacyPolicy;
        delete payload.termsAgreed;

        this.userService.registerUser(payload).subscribe({
            next: res => {
                localStorage.setItem('email', this.registerForm.value.email);
                this.router.navigateByUrl(`/${modulePath.auth}/${routeConstant.verifyEmail}`);
            },
            error: err => {
                this.alertService.openSnackBar(err.error.message, 'error');
            }
        });
    }
    handleResponse(response: any) {
        this.countries = response.result.map((country: any) => this.mapCountry(country));
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
    openLink(url: string) {
        window.open(url, '_blank');
    }
}
