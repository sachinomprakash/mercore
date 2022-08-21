import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletManagementRoutingModule } from './wallet-management-routing.module';
// import { WalletWrapperComponent } from '../wallet/wallet-wrapper/wallet-wrapper.component';
import { WalletOverviewComponent } from '../wallet/wallet-overview/wallet-overview.component';
import { WalletDocumentationComponent } from '../wallet/wallet-documentation/wallet-documentation.component';
import { DocumentationTableComponent } from './documentation/documentation-table/documentation-table.component';
import { MaterialModule } from '../modules/material/material.module';

@NgModule({
    declarations: [
        // WalletWrapperComponent,
        // WalletOverviewComponent,
        // WalletDocumentationComponent,
        DocumentationTableComponent
    ],
    imports: [CommonModule, WalletManagementRoutingModule, MaterialModule]
})
export class WalletManagementModule {}
