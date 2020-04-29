import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ChatComponent} from './chat/chat/chat.component';

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
