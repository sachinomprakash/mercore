import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
    selector: 'app-phone-input',
    templateUrl: './phone-input.component.html',
    styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements OnInit, OnChanges {
    @Input() countryISO2!: CountryISO;
    @Input() value!: string;
    @Input() validErrorMsg!: string;
    @Input() required: boolean;
    @Input() staicCountryList = [];
    @Output() phoneValidation = new EventEmitter<any>();
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    phoneForm: FormGroup;
    constructor() {}

    ngOnInit(): void {
        this.phoneForm = new FormGroup({
            phone: new FormControl(this.value)
        });
        if (this.required) {
            this.phoneForm.controls['phone'].addValidators(Validators.required);
        }
        if (!this.countryISO2) {
            this.countryISO2 = CountryISO.UnitedKingdom;
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['value'] && changes['value'].currentValue) {
            this.phoneForm.patchValue({ phone: this.value });
        }
    }

    focusFunction(ev: any) {
        if (this.phoneForm.controls['phone'].valid && this.phoneForm.controls['phone'].value) {
            const dialCode = this.phoneForm.controls['phone'].value.dialCode;
            let phoneObj = { ...this.phoneForm.controls['phone'].value };
            this.phoneForm.setValue({ phone: ev.target.value });
            let countryId;
            if (this.staicCountryList && this.staicCountryList.length > 0) {
                try {
                    let obj: any = this.staicCountryList.find(
                        (item: any) => item.iso2 == phoneObj?.countryCode
                    );
                    if (obj?.id) {
                        countryId = obj.id;
                    }
                } catch (e) {
                    console.log('country error', e);
                }
            }
            const value = {
                ...this.phoneForm?.value,
                dialCode: dialCode,
                countryId: '' + countryId
            };
            this.phoneValidation.emit({ value });
        } else {
            this.phoneValidation.emit({ value: '' });
        }
    }
}
