import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KycVerificationRoutingModule } from './kyc-verification-routing.module';
import { OnFidoComponent } from './on-fido/on-fido.component';

@NgModule({
    declarations: [OnFidoComponent],
    imports: [CommonModule, KycVerificationRoutingModule]
})
export class KycVerificationModule {}
