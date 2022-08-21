import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstant } from '../utils/constants/route.constant';
import { CddWrapperComponent } from './cdd-wrapper/cdd-wrapper.component';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: routeConstant.uploadDocs
    // },
    {
        path: `${routeConstant.uploadDocs}/:caseId`,
        component: CddWrapperComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CddRoutingModule {}
