import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Ng5BreadcrumbModule, BreadcrumbService} from 'ng5-breadcrumb';
import {TourMatMenuModule} from 'ngx-tour-md-menu';
import {ToastrModule} from 'ngx-toastr';

import {
    MatSlideToggleModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatDialogModule,
    MatGridListModule
} from '@angular/material';
import {RoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {AuthService} from './service/auth.service';
import {PageTitleService} from './core/page-title/page-title.service';
import {GeneAppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {MenuToggleModule} from './core/menu/menu-toggle.module';
import {MenuItems} from './core/menu/menu-items/menu-items';
import {AuthGuard} from './core/guards/auth.guard';
import {WidgetComponentModule} from './widget-component/widget-component.module';
import {SideBarComponent} from './Shared/side-bar/side-bar.component';
import {FooterComponent} from './Shared/footer/footer.component';
import {HorizontalLayoutComponent} from './horizontal-layout/horizontal-layout.component';
import {FuseModule} from '../@fuse/fuse.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '../@fuse/components';
import {FuseSharedModule} from '../@fuse/shared.module';
import {fuseConfig} from './fuse-config';
import {HorizontalMenuItems} from './horizontal-layout/horizontal-menu-items';
import {SafeHtmlPipe} from './Shared/pipes/image.pipe';
import {MenuService} from './service/menu.service';
import {ChoiceListService} from './main/layout/bbook/core/services/choice-list.service';
import {NoAuthGuard} from './core/guards/no-auth.guard';
import {BilgenUtils} from './utils/bilgen-utils';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RoutingModule,
        FlexLayoutModule,
        NgbModalModule.forRoot(),
        Ng5BreadcrumbModule.forRoot(),
        TourMatMenuModule.forRoot(),
        PerfectScrollbarModule,
        MenuToggleModule,
        HttpClientModule,
        MatSlideToggleModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatExpansionModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatChipsModule,
        MatListModule,
        MatSidenavModule,
        MatTabsModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatSliderModule,
        MatRadioModule,
        MatDialogModule,
        MatGridListModule,
        ToastrModule.forRoot(),
        WidgetComponentModule,
        LoadingBarRouterModule,
        LoadingBarRouterModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        WidgetComponentModule,


    ],
    declarations: [
        GeneAppComponent,
        MainComponent, SafeHtmlPipe,
        SideBarComponent, FooterComponent, HorizontalLayoutComponent
    ],
    exports: [],
    bootstrap: [GeneAppComponent],
    providers: [
        ChoiceListService,
        MenuItems,
        BreadcrumbService,
        PageTitleService,
        AuthService,
        MenuService,
        ChoiceListService,
        HorizontalMenuItems,
        BilgenUtils,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        AuthGuard,
        NoAuthGuard
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneAppModule {
}
