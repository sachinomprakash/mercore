import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestAuthComponent } from './guest-auth/guest-auth.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { CddModule } from '../cdd/cdd.module';
import { WalletWrapperComponent } from './wallet-wrapper/wallet-wrapper.component';
import { WalletOverviewComponent } from './wallet-overview/wallet-overview.component';
import { WalletDocumentationComponent } from './wallet-documentation/wallet-documentation.component';
import { ProductsComponent } from './wallet-overview/request-type/request-type.component';
import { TradingComponent } from './wallet-overview/trading-info/trading-info.component';
import { CompanyComponent } from './wallet-overview/company-info/company-info.component';

@NgModule({
    declarations: [
        GuestAuthComponent,
        WalletWrapperComponent,
        WalletOverviewComponent,
        WalletDocumentationComponent,
        ProductsComponent,
        TradingComponent,
        CompanyComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        UtilsModule,
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'authentication',
                pathMatch: 'full'
            },
            {
                path: 'auth',
                component: GuestAuthComponent
            },
            {
                path: 'wallet',
                component: WalletWrapperComponent
            }
        ]),
        CddModule
    ]
})
export class WalletModule {}
