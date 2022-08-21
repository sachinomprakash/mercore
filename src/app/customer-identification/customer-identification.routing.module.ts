import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstant } from '../utils/constants/route.constant';
import { CIPResolverService } from '../utils/services/resolvers/cip-resolver';
import { IdentificationWrapperComponent } from './identification-wrapper/identification-wrapper.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: routeConstant.productSelection
    },
    {
        path: routeConstant.productSelection,
        component: IdentificationWrapperComponent,
        resolve: { cipData: CIPResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}
