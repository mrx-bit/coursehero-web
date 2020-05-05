import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ChatComponent} from './chat/chat/chat.component';
import {ChildComponent} from './child/child.component';
import {CourseOpenComponent} from './dashboard/course-open/course-open.component';
import {LessonOpenComponent} from './dashboard/lesson-open/lesson-open.component';

export const LayoutRoutes: Routes = [

    {
        path: '123',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'bbook',
        loadChildren: () => import('./bbook/bbook.module').then(m => m.BBookModule)
    },
    {
        path: 'catalog',
        loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
    },
    {
        path: 'user-profile/:userId',
        component: UserProfileComponent
    },
    {
        path: 'child',
        component: ChildComponent
    },
    {
        path: 'course-open',
        component: CourseOpenComponent
    },
    {
        path: 'lesson-open',
        component: LessonOpenComponent
    },
    {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
        // loadChildren: './chat/chat.module#ChatModule'
    },

];

@NgModule({
    imports: [RouterModule.forChild(LayoutRoutes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
