import { Routes } from '@angular/router';
import { SaasComponent } from './saas/saas.component';
import { CrmComponent } from './crm/crm.component';
import {CrmDetailComponent} from './crm/crm-detail/crm-detail.component';
import {AlippeComponent} from './alippe/alippe.component';
import {VideoContentComponent} from './video-content/video-content.component';
import {SingleBookDashboardComponent} from './single-book-dashboard/single-book-dashboard.component';
import {ClassroomComponent} from './classroom/classroom.component';
import {MyclassComponent} from './myclass/myclass/myclass.component';

export const DashboardRoutes: Routes = [
   {
      path: '',
      redirectTo: 'crm',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [
         {
            path: 'saas',
            component: SaasComponent
         },
         {
            path: 'crm',
            component : CrmComponent
         },
          {
             path: 'crm-detail',
              component : CrmDetailComponent
          },
          {
              path: 'alippe/:code',
              component : AlippeComponent
          },
          {
              path: 'alippe-content/:content',
              component : AlippeComponent
          },
          {
              path: 'book',
              component : SingleBookDashboardComponent
          },
          {
              path: 'video-content',
              component : VideoContentComponent
          }, {
              path: 'myclass/:teacherId',
              component : MyclassComponent
          },
        ]
    },
    {
        path: 'classroom/:bookId',
        component: ClassroomComponent
    },
];
