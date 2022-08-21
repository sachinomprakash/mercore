import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formValidationMessage } from 'src/app/utils/constants/message.constant';
import { PatternConstants } from 'src/app/utils/constants/patternConstants';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { PasswordValidator } from 'src/app/utils/helpers/password-validator';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { UserService } from 'src/app/utils/services/httpServices/user.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    settingsForm!: FormGroup;
    phonetocuhed = false;
    selectedCountry: any;
    validationMessage = formValidationMessage;
    passhide = true;
    newPasshide = true;
    loginPath: any;
    countryList = [];
    constructor(
        private fb: FormBuilder,
        private commonService: CommonService,
        private staticService: StaticService,
        private userService: UserService,
        private alertService: AlertService
    ) {}
    handleResponse(data: any) {
        this.countryList = data.result;
    }
    handleError() {}
    ngOnInit(): void {
        this.initSettingsForm();
        this.staticService.getCountries().subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError
        });
        const stage = localStorage.getItem('stage');
        if (stage === '3') {
            this.loginPath = `/${modulePath.home}`;
        } else {
            this.loginPath = `/${modulePath.customer}/${routeConstant.productSelection}`;
        }
    }

    initSettingsForm() {
        this.settingsForm = this.fb.group({
            firstName: [
                '',
                [Validators.required, Validators.minLength(3), Validators.maxLength(32)]
            ],
            lastName: ['', [Validators.required, Validators.maxLength(32)]],
            phoneCountryId: [''],
            phoneNumber: ['', Validators.required],
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(PatternConstants.email),
                    Validators.maxLength(256),
                    PasswordValidator.businessEmail
                ]
            ],
            oldPassword: [
                '',
                [
                    Validators.minLength(8),
                    Validators.maxLength(64),
                    Validators.pattern(PatternConstants.password)
                ]
            ],
            newPassword: [
                '',
                [
                    Validators.minLength(8),
                    Validators.maxLength(64),
                    Validators.pattern(PatternConstants.password)
                ]
            ]
        });
        this.commonService.profileDetailsObservable.subscribe((res: any) => {
            this.settingsForm.patchValue({ ...res });
            this.selectedCountry = res.phoneCountry?.iso2;
        });
    }

    public errorHandling = (control: string, error: string) => {
        return this.settingsForm.controls[control].hasError(error);
    };

    checkPhoneValidation(ev: any): any {
        this.phonetocuhed = true;
        this.settingsForm.patchValue({
            phoneNumber: ev.value.phone,
            phoneCountryId: ev.value.countryId
        });
    }

    get controls() {
        return this.settingsForm.controls;
    }
    // countrySelected(country: any) {
    //     this.selectedCountry = country;
    //     this.settingsForm.patchValue({ phoneCountryId: country.id });
    // }
    saveChanges() {
        const postUserObj = {
            firstName: this.settingsForm.value.firstName,
            lastName: this.settingsForm.value.lastName,
            phoneNumber: this.settingsForm.value.phoneNumber,
            email: this.settingsForm.value.email,
            phoneCountryId: '' + this.settingsForm.value.phoneCountryId
        };
        this.userService.updateUserProfile(postUserObj).subscribe({
            next: (res: any) => {
                this.alertService.openSnackBar(res.message, 'success');
            },
            error: (err: any) => {
                this.alertService.openSnackBar(err.error.message, 'error');
            }
        });
        if (this.settingsForm.value.oldPassword && this.settingsForm.value.newPassword) {
            const postObj = {
                oldPassword: this.settingsForm.value.oldPassword,
                newPassword: this.settingsForm.value.newPassword
            };
            this.userService.changePassword(postObj).subscribe({
                next: (res: any) => {},
                error: (err: any) => {
                    this.alertService.openSnackBar(err.error.message, 'error');
                }
            });
        }
    }
}
