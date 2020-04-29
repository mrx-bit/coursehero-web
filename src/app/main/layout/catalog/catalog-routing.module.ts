import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChoiceComponent} from './choice/choice.component';
import {ChoiceAddEditComponent} from './choice/choice-add-edit/choice-add-edit.component';

const routes: Routes = [
    {
        path: '',
        component: ChoiceComponent,
    },
    {
        path: 'add',
        component: ChoiceAddEditComponent,
    },
    {
        path: 'edit/:id',
        component: ChoiceAddEditComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CatalogRoutingModule {
}
