import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPortalComponent } from './view-portal/view-portal.component';
import { AccessPortalRoutingModule } from './access-portal-routing.module';

@NgModule({
    declarations: [ViewPortalComponent],
    imports: [CommonModule, AccessPortalRoutingModule]
})
export class AccessPortalModule {}
