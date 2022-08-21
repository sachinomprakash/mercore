import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPortalComponent } from './view-portal/view-portal.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'view'
    },
    {
        path: 'view',
        component: ViewPortalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessPortalRoutingModule {}
