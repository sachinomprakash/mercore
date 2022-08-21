import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-identification.routing.module';
import { IdentificationWrapperComponent } from './identification-wrapper/identification-wrapper.component';
import { UtilsModule } from '../utils/utils.module';
import { MaterialModule } from '../modules/material/material.module';
import { RequestTypeComponent } from './request-type/request-type.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { TradingInfoComponent } from './trading-info/trading-info.component';
import { MdePopoverModule } from '@material-extended/mde';

@NgModule({
    declarations: [
        IdentificationWrapperComponent,
        RequestTypeComponent,
        CompanyInfoComponent,
        TradingInfoComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        MdePopoverModule,
        CustomerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        UtilsModule
    ]
})
export class CustomerIdentificationModule {}
