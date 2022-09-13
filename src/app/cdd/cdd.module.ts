import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CddWrapperComponent } from './cdd-wrapper/cdd-wrapper.component';
import { CddRoutingModule } from './cdd.routing.module';
import { MaterialModule } from '../modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectedIndividualComponent } from './connected-individual/connected-individual.component';
import { AdditionalRequestComponent } from './additional-request/additional-request.component';
import { SourcespopupComponent } from './sourcespopup/sourcespopup.component';
import { ProgresssummaryComponent } from './progresssummary/progresssummary.component';
import { UtilsModule } from '../utils/utils.module';
import { AddInfoComponent } from './connected-individual/add-info/add-info.component';
import { AddDocsComponent } from './connected-individual/add-docs/add-docs.component';
import { SourcesOfWealthComponent } from './connected-individual/sources-of-wealth/sources-of-wealth.component';
import { ProgressTableComponent } from './progresssummary/progress-table/progress-table.component';
import { ProgressButtonComponent } from './progresssummary/progress-button/progress-button.component';
import { ProgressAccordionComponent } from './progresssummary/progress-accordion/progress-accordion.component';
import { MdePopoverModule } from '@material-extended/mde';
import { DocumentContainerComponent } from './document-container/document-container.component';

@NgModule({
    declarations: [
        CddWrapperComponent,
        ConnectedIndividualComponent,
        AdditionalRequestComponent,
        SourcespopupComponent,
        AddInfoComponent,
        AddDocsComponent,
        SourcesOfWealthComponent,
        ProgresssummaryComponent,
        ProgressTableComponent,
        ProgressButtonComponent,
        ProgressAccordionComponent,
        DocumentContainerComponent
    ],
    imports: [
        CommonModule,
        CddRoutingModule,
        UtilsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MdePopoverModule
    ],
    exports: [ProgressAccordionComponent, ProgressTableComponent]
})
export class CddModule {}
