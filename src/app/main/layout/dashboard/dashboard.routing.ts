import {Routes} from '@angular/router';
import {SaasComponent} from './saas/saas.component';
import {CrmDetailComponent} from './crm/crm-detail/crm-detail.component';
import {VideoContentComponent} from './video-content/video-content.component';
import {FirstPageComponent} from './first-page/first-page.component';
import {QuestioningComponent} from './questioning/questioning.component';
import {NewsOrEventsOpenComponent} from './news-and-events/news-or-events-open/news-or-events-open.component';
import {CourseOpenComponent} from './course-open/course-open.component';
import {LessonOpenComponent} from './lesson-open/lesson-open.component';
import {SuitableCoursesComponent} from './suitable-courses/suitable-courses.component';
import {TasksComponent} from './tasks/tasks.component';
import {SingleBookDashboardComponent} from './single-book-dashboard/single-book-dashboard.component';
import {MyCoursesComponent} from './my-courses/my-courses.component';

export const DashboardRoutes: Routes = [
    {
        path: '',
        redirectTo: 'main',
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
                path: 'crm-detail',
                component: CrmDetailComponent
            },
            {
                path: 'book',
                component: SingleBookDashboardComponent
            },
            {
                path: 'video-content',
                component: VideoContentComponent
            }
        ]
    },
    {
        path: 'open-course',
        component: CourseOpenComponent
    },
    {
        path: 'main',
        component: FirstPageComponent
    },
    {
        path: 'open-lesson',
        component: LessonOpenComponent
    },
    {
        path: 'questioning',
        component: QuestioningComponent
    },
    {
        path: 'suitable-courses',
        component: SuitableCoursesComponent
    },
    {
        path: 'tasks',
        component: TasksComponent
    },
    {
        path: 'my-courses',
        component: MyCoursesComponent
    },
    {
        path: 'news',
        component: NewsOrEventsOpenComponent
    },
];
