import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookService} from './core/services/book.service';
import {Book2Service} from './core/services/book2.service';
import {BooksComponent} from './book/book-list/books.component';
import {AidarComponent} from './aidar/aidar/aidar.component';
import {AidarAddEditComponent} from './aidar/aidar-add-edit/aidar-add-edit.component';
import {GamesComponent} from './games/saikestendir/games.component';
import {LettersComponent} from './games/letters/letters.component';
import {OddImgComponent} from './games/odd-img/odd-img.component';
import {WrongWordComponent} from './games/wrong-word/wrong-word.component';
import {PutLetterComponent} from './games/put-letter/put-letter.component';
import {QuestionImageComponent} from './games/question-image/question-image.component';
import {BuynComponent} from './games/buyn/buyn.component';
import {FlowersWordComponent} from './games/1-flowers-word/flowers-word.component';
import {ThinkToFindComponent} from './games/2-think-to-find/think-to-find.component';
import {SyllableConstructorComponent} from './games/3-syllable-constructor/syllable-constructor.component';
import {BallWordComponent} from './games/4-ball-word/ball-word.component';
import {FindGameComponent} from './games/find-game/find-game.component';
import {CreateWordComponent} from './games/create-word/create-word.component';
import {PresentationAidarComponent} from './presentation-aidar/presentation-aidar.component';
import {BookDetailNewComponent} from './book/book-detail-new/book-detail-new.component';
import {ContentCrudComponent} from './content-crud/content-crud.component';
import {ContentComponent} from './content/content.component';
import {ContentChapterComponent} from './content-chapter/content-chapter.component';
import {ContentPageComponent} from './content-page/content-page.component';
import {OddImgAudioComponent} from './games/odd-img-audio/odd-img-audio.component';
import {ApplicationBookComponent} from './application-book/application-book.component';
import {PromoCodeComponent} from './promo-code/promo-code.component';
import {BuynKizilKokComponent} from './games/buyn-kizil-kok/buyn-kizil-kok.component';
import {SaikestendirPhotoComponent} from './games/saikestendir-photo/saikestendir-photo.component';
import {SozKuraComponent} from './games/soz-kura/soz-kura.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'game',
        component: GamesComponent
    },
    {
        path: 'promo',
        component: PromoCodeComponent
    },
    {
        path: 'game/think-to-find/:aidarId',
        component: ThinkToFindComponent
    },
    {
        path: 'game/flowers-word/:aidarId',
        component: FlowersWordComponent
    },
    {
        path: 'game/syllable-constructor/:aidarId',
        component: SyllableConstructorComponent
    },
    {
        path: 'game/ball-word/:aidarId',
        component: BallWordComponent
    },
    {
        path: 'game/letters',
        component: LettersComponent
    },
    {
        path: 'game/odd-img',
        component: OddImgComponent
    },
    {
        path: 'game/odd-img-audio',
        component: OddImgAudioComponent
    },
    {
        path: 'game/put-letter',
        component: PutLetterComponent
    },
    {
        path: 'game/question-image',
        component: QuestionImageComponent
    },
    {
        path: 'game/buyn-kizil-kok',
        component: BuynKizilKokComponent
    },
    {
        path: 'game/saikestendir-photo',
        component: SaikestendirPhotoComponent
    },
    {
        path: 'game/soz-kura',
        component: SozKuraComponent
    },
    {
        path: 'game/buyn',
        component: BuynComponent
    },
    {
        path: 'find',
        component: FindGameComponent
    },
    {
        path: 'create-word',
        component: CreateWordComponent
    },
    {
        path: 'game/wrong-word',
        component: WrongWordComponent
    },
    {
        path: 'aidar',
        component: AidarComponent
    },
    {
        path: 'aidar/:type/:bookId',
        component: AidarAddEditComponent
    },
    {
        path: 'books',
        component: BooksComponent,
        resolve: {
            book: BookService
        }
    },
    {
        path: 'book/:bookId/:step',
        component: BookDetailNewComponent,
        resolve: {
            book: Book2Service
        }
    },
    {
        path: 'presentation',
        component: PresentationAidarComponent
    },
    {
        path: 'content-crud',
        component: ContentCrudComponent
    },
    {
        path: 'content/:bookId',
        component: ContentComponent
    },
    {
        path: 'content-chapter/:contentId',
        component: ContentChapterComponent
    },
    {
        path: 'content-page/:aidarId',
        component: ContentPageComponent
    },
    {
        path: 'applications',
        component: ApplicationBookComponent
    },
    {
        path: '*', redirectTo: '/dashboard'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BbookRoutingModule {
}
