import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BbookRoutingModule} from './bbook-routing.module';
import {BbookComponent} from './bbook.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule, MatMenuModule,
    MatPaginatorModule, MatProgressBarModule, MatRadioModule, MatRippleModule,
    MatSelectModule, MatSidenavModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule, MatToolbarModule, MatSlideToggleModule, MatDividerModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {PageService} from './core/services/page.service';
import {ClassroomService} from './core/services/classroom.service';
import {AidarCommentService} from './core/services/aidar-comment.service';
import {AidarService} from './core/services/aidar.service';
import {ChoiceListService} from './core/services/choice-list.service';
import {BookService} from './core/services/book.service';
import {Book2Service} from './core/services/book2.service';
import {BContentAddEditComponent} from './book/steps/2-book-content/dialog/bcontent-add-edit/bcontent-add-edit.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AgmCoreModule} from '@agm/core';
import {UiSwitchModule} from 'ngx-ui-switch';
import {AidarComponent} from './aidar/aidar/aidar.component';
import {BooksComponent} from './book/book-list/books.component';
import {BookComponent} from './book/book-detail/book.component';
import {BookContentComponent} from './book/steps/2-book-content/book-content.component';
import {BookInfoComponent} from './book/steps/1-book-info/book-info.component';
import {AidarAddEditComponent} from './aidar/aidar-add-edit/aidar-add-edit.component';
import {BookPageComponent} from './book/steps/3-book-page/book-page.component';
import {AngularTreeGridModule} from 'angular-tree-grid';
import {GamesComponent} from './games/saikestendir/games.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {OddImgComponent} from './games/odd-img/odd-img.component';
import {WrongWordComponent} from './games/wrong-word/wrong-word.component';
import {LettersComponent} from './games/letters/letters.component';
import {BuynComponent} from './games/buyn/buyn.component';
import {QuestionImageComponent} from './games/question-image/question-image.component';
import {PutLetterComponent} from './games/put-letter/put-letter.component';
import {FlowersWordComponent} from './games/1-flowers-word/flowers-word.component';
import {ThinkToFindComponent} from './games/2-think-to-find/think-to-find.component';
import {SyllableConstructorComponent} from './games/3-syllable-constructor/syllable-constructor.component';
import {LayoutModule} from '../layout.module';
import {BallWordComponent} from './games/4-ball-word/ball-word.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {FindGameComponent} from './games/find-game/find-game.component';
import {CreateWordComponent} from './games/create-word/create-word.component';
import {PresentationAidarComponent} from './presentation-aidar/presentation-aidar.component';
import {SecurePipe} from '../../../Shared/pipes/secure.pipe';
import {SafePipeModule} from 'safe-pipe';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseSidebarModule, FuseWidgetModule} from '../../../../@fuse/components';
import {BookDetailNewComponent} from './book/book-detail-new/book-detail-new.component';
import {ContentCrudComponent} from './content-crud/content-crud.component';
import {ContentAddEditComponent} from './content-crud/content-add-edit/content-add-edit.component';
import {BooksService} from './core/services/books.service';
import {ContentComponent} from './content/content.component';
import {ContentChapterComponent} from './content-chapter/content-chapter.component';
import {ContentPageComponent} from './content-page/content-page.component';
import {TrainingAidarComponent} from './games/training-aidar/training-aidar.component';
import {OddImgAudioComponent} from './games/odd-img-audio/odd-img-audio.component';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {VgStreamingModule} from 'videogular2/streaming';
import {WidgetComponentModule} from '../../../widget-component/widget-component.module';
import {AnswerDialogComponent} from './games/answer-dialog/answer-dialog.component';
import {ApplicationBookComponent} from './application-book/application-book.component';
import {ApplicationBookService} from './core/services/application-book.service';
import {ApplicationBookAddEditComponent} from './application-book/application-book-add-edit/application-book-add-edit.component';
import {PromoCodeComponent} from './promo-code/promo-code.component';
import {PromoCodeService} from './core/services/promo-code.service';
import {PromoCodeGenerateComponent} from './promo-code/promo-code-generate/promo-code-generate.component';
import { BuynKizilKokComponent } from './games/buyn-kizil-kok/buyn-kizil-kok.component';
import { SozKuraComponent } from './games/soz-kura/soz-kura.component';
import { SaikestendirPhotoComponent } from './games/saikestendir-photo/saikestendir-photo.component';
import {OrderBy} from './core/services/order-pipe';
/*import { BbookLangUtilComponent } from './bbook-lang-util/bbook-lang-util.component';*/

@NgModule({
    declarations: [BbookComponent, AidarComponent, BooksComponent, BookComponent, BContentAddEditComponent, BookContentComponent,
        BookInfoComponent, BookPageComponent, AidarAddEditComponent, GamesComponent, OddImgComponent, WrongWordComponent, LettersComponent,
        PutLetterComponent, QuestionImageComponent, BuynComponent, ThinkToFindComponent, FlowersWordComponent, SyllableConstructorComponent,
        BallWordComponent, FindGameComponent, CreateWordComponent, PresentationAidarComponent, BookDetailNewComponent,
        ContentCrudComponent, ContentAddEditComponent, ContentComponent, ContentChapterComponent, ContentPageComponent,
        TrainingAidarComponent, OddImgAudioComponent, AnswerDialogComponent, ApplicationBookComponent, ApplicationBookAddEditComponent,
        PromoCodeComponent, PromoCodeGenerateComponent, BuynKizilKokComponent, SozKuraComponent, SaikestendirPhotoComponent,
        OrderBy,
    ],
    imports: [
        CommonModule,
        BbookRoutingModule,
        FormsModule,
        DragDropModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatIconModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatMenuModule,
        MatRippleModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatDialogModule,
        MatProgressBarModule,
        UiSwitchModule,
        MatChipsModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatTabsModule,
        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),
        FuseSharedModule,
        FuseWidgetModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FuseSidebarModule,
        FuseConfirmDialogModule,
        TranslateModule,
        AngularTreeGridModule,
        LayoutModule,
        ColorPickerModule,
        MatSidenavModule,
        MatRadioModule,
        MatSlideToggleModule,
        SafePipeModule,
        MatDividerModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        VgStreamingModule,
        MatDividerModule,
        WidgetComponentModule,
    ],
    entryComponents: [
        BContentAddEditComponent, ContentAddEditComponent, AnswerDialogComponent, ApplicationBookAddEditComponent,
        PromoCodeGenerateComponent, AidarAddEditComponent,
    ],
    providers: [
        Book2Service, BookService, ChoiceListService, AidarService, AidarCommentService, ClassroomService, PageService,
        ApplicationBookService, BooksService, PromoCodeService, {
            provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
            useValue: {useUtc: true}
        }, OrderBy

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [SecurePipe, TrainingAidarComponent, OddImgComponent, FlowersWordComponent, ThinkToFindComponent,
        BallWordComponent, SyllableConstructorComponent, BuynComponent, CreateWordComponent, LettersComponent,
        PutLetterComponent, QuestionImageComponent, WrongWordComponent, GamesComponent, OddImgAudioComponent,
        BuynKizilKokComponent, SozKuraComponent, SaikestendirPhotoComponent,],

})
export class BBookModule {
}
