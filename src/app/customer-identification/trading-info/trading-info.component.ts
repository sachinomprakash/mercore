import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CIP } from 'src/app/models/cip.model';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { CipService } from 'src/app/utils/services/httpServices/cip.service';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { LoaderService } from 'src/app/utils/services/loader/loader.service';

@Component({
    selector: 'app-trading-info',
    templateUrl: './trading-info.component.html',
    styleUrls: ['./trading-info.component.scss']
})
export class TradingInfoComponent implements OnInit {
    @Input() cipData: CIP;
    @Input() countries: any[];
    @Output() onNext = new EventEmitter();
    @Output() goBack = new EventEmitter();
    industoryTrade: any;
    countries3: any[];
    countries4: any[];
    form: FormGroup;
    popover = false;
    popover1 = false;
    popover2: any;
    constructor(
        private staticService: StaticService,
        private fb: FormBuilder,
        private cipService: CipService,
        private loaderService: LoaderService
    ) {}

    ngOnInit(): void {
        window.scroll(0, 0);
        this.getAPIDataOnInit();
        this.initForm();
    }

    getAPIDataOnInit() {
        this.countries = this.countries.map((obj: any) => ({
            id: obj.id,
            label: obj.name,
            icon: `assets/svg-country-flags/svg/${obj.alpha2Code.toLowerCase()}.svg`,
            checked: false
        }));
        this.countries3 = [...this.countries];
        this.countries4 = [...this.countries];
        this.staticService.getSectorOfTrade().subscribe({
            next: (res: any) => {
                this.industoryTrade = res.result.map((obj: any) => ({
                    id: obj.id,
                    label: obj.name
                }));
            }
        });
    }

    initForm() {
        this.form = this.fb.group({
            trading_name: [
                this.cipData.trading_name || '',
                [Validators.minLength(2), Validators.maxLength(65)]
            ],
            is_trading_address_same: [this.cipData.is_trading_address_same || false],
            tradingAddress: [this.cipData.trading_address.address || '', Validators.required],
            city: [this.cipData.trading_address.city || '', Validators.required],
            zip: [this.cipData.trading_address.zipcode || '', Validators.required],
            sector_of_intended_trade: this.fb.array([], Validators.required),
            physical_presence: this.fb.array([], Validators.required),
            countries_of_presence_operations: this.fb.array([], Validators.required),
            countries_of_intended_trade: this.fb.array([], Validators.required)
        });
        if (this.cipData) {
            this.cipData.sector_of_intended_trade.forEach(val =>
                this.addControl(val, 'sector_of_intended_trade')
            );
            this.cipData.physical_presence.forEach(val =>
                this.addControl(val, 'physical_presence')
            );
            this.cipData.countries_of_presence_operations.forEach(val =>
                this.addControl(val, 'countries_of_presence_operations')
            );
            this.cipData.countries_of_intended_trade.forEach(val =>
                this.addControl(val, 'countries_of_intended_trade')
            );
        }
    }
    public errorHandling = (control: string, error: string) => {
        return this.form.controls[control].hasError(error);
    };
    get controls() {
        return this.form.controls;
    }
    selectItemEvent(event: any, controleName: string) {
        const formArray: FormArray = this.form.get(controleName) as FormArray;
        if (event.isChecked) {
            this.addControl(event.value, controleName);
        } else {
            if (event.deleteIndex >= 0) {
                formArray.removeAt(event.deleteIndex);
            }
        }
    }
    setPrevAddress(event: any) {
        if (event.checked) {
            this.controls['city'].setValue(this.cipData.company_address.city);
            this.controls['zip'].setValue(this.cipData.company_address.zipcode);
            this.controls['tradingAddress'].setValue(this.cipData.company_address.address);
        }
    }
    addControl(value: number, controleName: string) {
        const formArray: FormArray = this.form.get(controleName) as FormArray;
        formArray.push(new FormControl(value));
    }

    next(ev: Event) {
        // this.alertService
        //     .openConfirmDialog(
        //         `You are about to submit your application. Are you sure?`,
        //         'Yes',
        //         'Cancel',
        //         'confirmAction'
        //     )
        //     .subscribe((res: any) => {
        //         if (res) {
        ev.preventDefault();
        if (this.form.invalid) {
            return;
        }
        // this.loaderService.show();
        this.cipService.addCIP(this.payload, '3').subscribe({
            next: () => {
                this.cipService.syncCipData.next(true);
                this.onNext.emit({ valid: true });
                this.loaderService.hide();
            },
            error: err => {
                console.log(err);
                this.loaderService.hide();
            }
        });
        this.onNext.emit();
        //     }
        // });
    }
    showPopover(state: any) {
        this.popover = state;
    }
    showPopover1(state: any) {
        this.popover1 = state;
    }
    showPopover2(state: any) {
        this.popover2 = state;
    }
    get payload() {
        const value = this.form.value;
        return {
            trading_name: value.trading_name,
            is_trading_address_same: value.is_trading_address_same,
            trading_address: {
                address: value.tradingAddress,
                city: value.city,
                zipcode: value.zip
            },
            sector_of_intended_trade: value.sector_of_intended_trade,
            physical_presence: value.physical_presence,
            countries_of_presence_operations: value.countries_of_presence_operations,
            countries_of_intended_trade: value.countries_of_intended_trade
        };
    }
    back() {
        this.goBack.emit();
    }
}
