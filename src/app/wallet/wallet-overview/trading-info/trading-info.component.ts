import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { IListItem } from 'src/app/core/interfaces/utils.interface';
// import {
//   Case,
//   CIPOverviewComponent,
//   OverviewAction,
// } from 'src/app/core/models/cip.model';
// import {
//   AlertService,
//   MessageType,
// } from 'src/app/core/services/alertService/alert.service';
// import { CaseService } from '../../services/case.service';

@Component({
    selector: 'app-trading',
    templateUrl: './trading-info.component.html',
    styleUrls: ['./trading-info.component.scss']
})
export class TradingComponent implements OnInit, OnDestroy {
    @Input() editMode: boolean;
    @Output() onSaveChanges = new EventEmitter();
    @Input() tradingInfo: any;
    tradingInfoForm: FormGroup;
    discard: boolean;
    save: boolean;
    unsubscription: Subscription;

    selected_intended_trade: number[] = [];
    selected_presence_operations: number[] = [];
    selectedCustomerLocation: number[] = [];
    selectedIntedeTrade: number[] = [];

    // industorySeectorListItem: IListItem[];
    constructor(
        // public caseService: CaseService,
        private fb: FormBuilder // private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.tradingInfoForm.disable();
        // this.parentActionSubscribe();
    }
    // parentActionSubscribe() {
    //   this.unsubscription = this.caseService.parentAction.subscribe({
    //     next: (res: any) => {
    //       if (res.componentType == CIPOverviewComponent.tradingInfo) {
    //         this.editMode = res.action == OverviewAction.edit;
    //         this.discard = res.action == OverviewAction.discard;
    //         this.save = res.action == OverviewAction.save;
    //         if (this.editMode) {
    //           this.editMode = true;
    //           this.tradingInfoForm.enable();
    //         } else if (this.discard) {
    //           this.editMode = false;
    //           this.tradingInfoForm.disable();
    //           this.initForm();
    //         } else if (this.save) {
    //           this.saveChanges();
    //         }
    //       }
    //     },
    //   });
    // }
    // saveChanges() {
    //   if (this.tradingInfoForm.invalid) {
    //     return;
    //   }
    //   this.caseService
    //     .updateCIPData(this.caseService.caseInfo.entity._id, this.payload, '3')
    //     .subscribe({
    //       next: (res) => {
    //         this.onSaveChanges.emit(true);
    //         this.alertService.openSnackBar(res.message, MessageType.success);
    //         this.tradingInfoForm.disable();
    //         //TODO: Temp Sync
    //         this.caseService
    //           .getCaseData(this.caseService.caseInfo.internal_id)
    //           .subscribe({
    //             next: (res) => {
    //               this.caseService.caseInfo = new Case(res.result);
    //             },
    //           });
    //       },
    //       error: (err) => {},
    //     });
    // }
    get payload() {
        const value = this.tradingInfoForm.value;
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
    initForm() {
        this.tradingInfoForm = this.fb.group({
            trading_name: [
                this.tradingInfo?.trading_name || '',
                [Validators.minLength(2), Validators.maxLength(65)]
            ],
            tradingAddress: [
                this.tradingInfo?.trading_address?.address || '',
                [Validators.required, Validators.minLength(2)]
            ],
            city: [this.tradingInfo?.trading_address?.city || '', Validators.required],
            zip: [this.tradingInfo?.trading_address?.zipcode || '', Validators.required],
            sector_of_intended_trade: this.fb.array([], Validators.required),
            physical_presence: this.fb.array([], Validators.required),
            countries_of_presence_operations: this.fb.array([], Validators.required),
            countries_of_intended_trade: this.fb.array([], Validators.required)
        });

        // this.tradingInfoForm.patchValue(
        //   this.caseService.caseInfo?.entity?.tradingInfo
        // );

        // if (this.caseService.caseInfo?.entity) {
        //   this.caseService.caseInfo.entity.sector_of_intended_trade.forEach((obj) =>
        //     this.addControl(obj.id, 'sector_of_intended_trade')
        //   );
        //   this.caseService.caseInfo.entity.physical_presence.forEach((obj) =>
        //     this.addControl(obj.id, 'physical_presence')
        //   );
        //   this.caseService.caseInfo.entity.countries_of_presence_operations.forEach(
        //     (obj) => this.addControl(obj.id, 'countries_of_presence_operations')
        //   );
        //   this.caseService.caseInfo.entity.countries_of_intended_trade.forEach(
        //     (obj) => this.addControl(obj.id, 'countries_of_intended_trade')
        //   );
        // }
    }
    addControl(value: number, controleName: string) {
        const formArray: FormArray = this.tradingInfoForm.get(controleName) as FormArray;
        formArray.push(new FormControl(value));
    }
    get controls() {
        return this.tradingInfoForm.controls;
    }
    errorHandling(controlName: string, error: string) {
        return this.controls[controlName].hasError(error);
    }
    selectItemEvent(event: any, controleName: string) {
        const formArray: FormArray = this.tradingInfoForm.get(controleName) as FormArray;
        if (event.isChecked) {
            this.addControl(event.value, controleName);
        } else {
            if (event.deleteIndex >= 0) {
                formArray.removeAt(event.deleteIndex);
            }
        }
    }
    ngOnDestroy(): void {
        this.unsubscription.unsubscribe();
    }
}
