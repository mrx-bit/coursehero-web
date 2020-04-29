import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {HorizontalLayoutComponent} from './horizontal-layout/horizontal-layout.component';
import {NoAuthGuard} from './core/guards/no-auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'session',
        canActivate: [NoAuthGuard],
        loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
    },
    {
        path: '',
        component: HorizontalLayoutComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {path: 'dashboard', loadChildren: () => import('./main/layout/dashboard/dashboard.module').then(m => m.DashboardModule)},
            {path: 'app', loadChildren: () => import('./main/layout/layout.module').then(m => m.LayoutModule)},
            {path: 'chat', loadChildren: () => import('./main/layout/chat/chat.module').then(m => m.ChatModule)}

        ]
    },
    {
        path: '*',
        redirectTo: 'session/login'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        useHash: true,
        onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule],
    providers: []
})
export class RoutingModule {

}
