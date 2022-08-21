import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnFidoComponent } from './on-fido/on-fido.component';

const routes: Routes = [
    {
        path: '',
        component: OnFidoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KycVerificationRoutingModule {}
