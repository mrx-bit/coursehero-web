import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSortModule,
    MatSelectModule, MatTooltipModule, MatSidenavModule, MatExpansionModule, MatToolbarModule, MatGridListModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {ChartsModule} from 'ng2-charts';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AgmCoreModule} from '@agm/core';
import {EasyPieChartModule} from 'ng2modules-easypiechart';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {DashboardRoutes} from './dashboard.routing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SaasComponent} from './saas/saas.component';
import {CrmComponent} from './crm/crm.component';
import {WidgetComponentModule} from '../../../widget-component/widget-component.module';
import {CrmDetailComponent} from './crm/crm-detail/crm-detail.component';
import {VgControlsModule} from 'videogular2/controls';
import {VgBufferingModule} from 'videogular2/buffering';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgCoreModule} from 'videogular2/core';
import {VgStreamingModule} from 'videogular2/streaming';
import {AlippeComponent} from './alippe/alippe.component';
import {VideoContentComponent} from './video-content/video-content.component';
import {BooksService} from '../bbook/core/services/books.service';
import {LayoutModule} from '../layout.module';
import {AidarService} from '../bbook/core/services/aidar.service';
import {SingleBookDashboardComponent} from './single-book-dashboard/single-book-dashboard.component';
import {ClassroomComponent} from './classroom/classroom.component';
import {ClassroomService} from '../bbook/core/services/classroom.service';
import {BookService} from '../bbook/core/services/book.service';
import {BBookModule} from '../bbook/bbook.module';
import {MyclassComponent} from './myclass/myclass/myclass.component';

@NgModule({
    declarations: [
        SaasComponent,
        CrmComponent,
        CrmDetailComponent,
        AlippeComponent,
        VideoContentComponent,
        SingleBookDashboardComponent,
        ClassroomComponent,
        MyclassComponent,
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatSelectModule,
        FlexLayoutModule,
        WidgetComponentModule,
        EasyPieChartModule,
        MatPaginatorModule,
        MatChipsModule,
        TranslateModule,
        PerfectScrollbarModule,
        RouterModule.forChild(DashboardRoutes),
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatTabsModule,
        MatCardModule,
        MatMenuModule,
        MatListModule,
        MatCheckboxModule,
        MatDividerModule,
        ChartsModule,
        NgxDatatableModule,
        MatProgressBarModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule,
        FlexLayoutModule,
        MatTooltipModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        VgStreamingModule,
        MatExpansionModule,
        MatToolbarModule,
        MatGridListModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyD4y2luRxfM8Q8yKHSLdOOdNpkiilVhD9k'}),
        LayoutModule,
        WidgetComponentModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        VgStreamingModule, TranslateModule
    ],
    providers: [BooksService, AidarService, ClassroomService, TranslateService, BookService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {
}
