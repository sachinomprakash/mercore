import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { MaterialModule } from '../modules/material/material.module';
import { CipRoutingModule } from './cip-routing.module';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { IdentificationWrapperComponent } from '../customer-identification/identification-wrapper/identification-wrapper.component';
import { RequestTypeComponent } from '../customer-identification/request-type/request-type.component';
import { CompanyInfoComponent } from '../customer-identification/company-info/company-info.component';
import { TradingInfoComponent } from '../customer-identification/trading-info/trading-info.component';
import { MdePopoverModule } from '@material-extended/mde';
import { CipWrappperComponent } from './cip-wrappper/cip-wrappper.component';
import { CompanyTypeComponent } from './company-type/company-type.component';
import { ProductInformationComponent } from './product-information/product-information.component';

@NgModule({
    declarations: [
        WelcomeScreenComponent,
        ContactUsComponent,
        IdentificationWrapperComponent,
        RequestTypeComponent,
        CompanyInfoComponent,
        TradingInfoComponent,
        CipWrappperComponent,
        CompanyTypeComponent,
        ProductInformationComponent
    ],
    imports: [
        CommonModule,
        CipRoutingModule,
        UtilsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MdePopoverModule
    ]
})
export class CipModule {}
