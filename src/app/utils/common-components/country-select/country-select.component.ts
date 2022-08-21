import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '@angular-material-extensions/select-country';
import { StaticService } from '../../services/httpServices/static.service';

@Component({
    selector: 'app-country-select',
    templateUrl: './country-select.component.html',
    styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {
    @Input() countries!: Country[];
    @Input() label: any = '';
    @Input() selectedCountry: Country;
    @Input() placeholder: string;
    @Output() countryValidation = new EventEmitter<any>();
    @Output() onCountrySelect = new EventEmitter<any>();
    @Input() errorMsg?: string;
    country: any;
    title = 'select-country';
    countryFormControl = new FormControl();
    countryFormGroup!: FormGroup;
    errors: boolean;
    // countryFormGroup: FormGroup | undefined;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.countryFormGroup = this.formBuilder.group({
            country: ['', Validators.required]
        });
        this.countryFormGroup.patchValue({ country: this.selectedCountry });
    }

    focusFunction(ev: any) {
        this.countryFormGroup.setValue({ country: ev.target.value });
        this.errorHandling('country', 'required');
    }

    onCountrySelected(country: Country) {
        this.countryFormGroup.setValue({ country });
        this.onCountrySelect.emit(country);
        this.errorHandling('country', 'required');
    }

    public errorHandling = (control: string, error: string) => {
        const emitValue = this.countryFormGroup.controls[control].hasError(error);
        this.errors = emitValue;
        const value = this.countryFormGroup?.value;
        this.countryValidation.emit({ control, emitValue, value });
        return this.countryFormGroup.controls[control].hasError(error);
    };
}
