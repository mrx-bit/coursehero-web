import { NgModule } from '@angular/core';

import { FuseSidebarComponent } from './sidebar.component';
import {FuseSidebarService} from './sidebar.service';

@NgModule({
    declarations: [
        FuseSidebarComponent
    ],
    exports     : [
        FuseSidebarComponent
    ]
})
export class FuseSidebarModule
{
}
