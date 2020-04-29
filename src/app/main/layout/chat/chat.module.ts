import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat/chat.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {ChatRoutingModule} from './chat-routing.module';
import {ClassroomService} from '../bbook/core/services/classroom.service';
import {ChatService} from './service/chat.service';
import {PageTitleService} from './service/page-title.service';

@NgModule({
    declarations: [ChatComponent],
    imports: [
        CommonModule,
        ChatRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        MatDividerModule,
        MatSidenavModule,
        MatListModule,
        MatFormFieldModule,
        FormsModule,
        PerfectScrollbarModule,
        MatInputModule,
        FlexLayoutModule,
        TranslateModule
    ],
    providers: [ClassroomService, ChatService, PageTitleService]
})
export class ChatModule {
}
