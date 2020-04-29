import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {LayoutRoutingModule} from './layout-routing.module';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatListModule
} from '@angular/material';

import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartsModule} from 'ng2-charts';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {WidgetComponentModule} from '../../widget-component/widget-component.module';
import {TranslateModule} from '@ngx-translate/core';
import {SecurePipe} from '../../Shared/pipes/secure.pipe';
import {SafePipeModule} from 'safe-pipe';



@NgModule({
    declarations: [UserProfileComponent, SecurePipe],
    imports: [ LayoutRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatCardModule,
        MatTableModule,
        MatMenuModule,
        MatListModule,
        MatCheckboxModule,
        ChartsModule,
        MatDividerModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatInputModule,
        MatFormFieldModule,
        PerfectScrollbarModule,
        MatExpansionModule,
        NgxDatatableModule,
        FlexLayoutModule,
        MatChipsModule,
        MatOptionModule,
        MatSelectModule,
        SlickCarouselModule,
        WidgetComponentModule,
        TranslateModule,
        SafePipeModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [SecurePipe],

})
export class LayoutModule {
}
