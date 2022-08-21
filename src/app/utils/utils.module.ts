import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountrySelectComponent } from './common-components/country-select/country-select.component';
import { PhoneInputComponent } from './common-components/phone-input/phone-input.component';
import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { HeaderComponentComponent } from './common-components/header-component/header-component.component';
import { MaterialModule } from '../modules/material/material.module';
import { MultiSelectComponent } from './common-components/multi-select/multi-select.component';
import { SearchBarComponent } from './common-components/search-bar/search-bar.component';
import { LoaderComponent } from './common-components/loader/loader.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { SidebarComponent } from './common-components/sidebar/sidebar.component';
import { WrapperComponent } from './common-components/wrapper/wrapper.component';
import { RouterModule } from '@angular/router';
import { UploadContainerComponent } from './common-components/upload-container/upload-container.component';
import { DocumentListComponent } from './common-components/document-list/document-list.component';
import { DndDirective } from './directives/dnd.directive';
import { ProgressComponent } from './common-components/progress/progress.component';
import { ConfirmDialogComponent } from './common-components/confirm-dialog/confirm-dialog.component';
import { TableComponent } from './common-components/table/table.component';
import { ReviwedStatusPipe } from './pipes/reviwed-status.pipe';
import { ShimmerLoaderComponent } from './common-components/shimmer-loader/shimmer-loader.component';
import { IconTableComponent } from './common-components/icon-table/icon-table.component';
import { CipThankyouComponent } from '../customer-identification/cip-thankyou/cip-thankyou.component';
import { SearchPipe } from './pipes/search-pipe.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { MultiselectSearchDropdownComponent } from './common-components/multiselect-search-dropdown/multiselect-search-dropdown.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

export function playerFactory() {
    return player;
}
@NgModule({
    declarations: [
        CountrySelectComponent,
        PhoneInputComponent,
        MinuteSecondsPipe,
        MultiSelectComponent,
        HeaderComponentComponent,
        SearchBarComponent,
        LoaderComponent,
        ShortenPipe,
        ShimmerLoaderComponent,
        SidebarComponent,
        WrapperComponent,
        UploadContainerComponent,
        DocumentListComponent,
        DndDirective,
        ProgressComponent,
        ConfirmDialogComponent,
        TableComponent,
        ReviwedStatusPipe,
        IconTableComponent,
        CipThankyouComponent,
        SearchPipe,
        StatusPipe,
        FilterPipe,
        MultiselectSearchDropdownComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
        LottieModule.forRoot({ player: playerFactory })
    ],
    exports: [
        ShimmerLoaderComponent,
        CountrySelectComponent,
        PhoneInputComponent,
        MinuteSecondsPipe,
        MultiSelectComponent,
        HeaderComponentComponent,
        LoaderComponent,
        ShortenPipe,
        SearchBarComponent,
        WrapperComponent,
        SidebarComponent,
        UploadContainerComponent,
        DocumentListComponent,
        DndDirective,
        ProgressComponent,
        ConfirmDialogComponent,
        TableComponent,
        IconTableComponent,
        CipThankyouComponent,
        SearchPipe,
        StatusPipe,
        FilterPipe,
        MultiselectSearchDropdownComponent
    ]
})
export class UtilsModule {}
