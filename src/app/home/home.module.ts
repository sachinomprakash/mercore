import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home.routing.module';
import { MaterialModule } from '../modules/material/material.module';
import { UtilsModule } from '../utils/utils.module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DashboardComponent, SettingsComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        UtilsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class HomeModule {}
