import {Component, OnInit} from '@angular/core';
import {PageTitleService} from '../../../../../core/page-title/page-title.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import {AidarService} from '../../../bbook/core/services/aidar.service';
import {ClassroomService} from '../../../bbook/core/services/classroom.service';
import {Classroom} from '../../../bbook/core/models/classroom';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-myclass',
    templateUrl: './myclass.component.html',
    styleUrls: ['./myclass.component.scss']
})
export class MyclassComponent implements OnInit {
    subscription: any;
    teacherId: any;
    classroom: Classroom;

    studentInfos: any[] = [];

    constructor(
        private pageTitleService: PageTitleService,
        private translate: TranslateService,
        private route: ActivatedRoute,
        private _service: ClassroomService
    ) {


    }

    ngOnInit(): void {

        this.classroom = new Classroom();

        this.subscription = this.route.params
            .subscribe((params) => {
                this.teacherId = params['teacherId'];
                this.getClassroomByTeacherId(this.teacherId);
                this.getStudentInfosByTeacherId(this.teacherId);
            });
        this.pageTitleService.setTitle('GalleryV2');
    }


    getClassroomByTeacherId(id): void {
        this._service.getClassroomByTeacherId(id).pipe().subscribe(response => {
            this.classroom = response;
            console.log('----------------------------------------------------------');
            console.log(this.classroom);
        });
    }

    getStudentInfosByTeacherId(id): void {
        this._service.getStudentInfosByTeacherId(id).subscribe((res) => {
            this.studentInfos = res;
            console.log('studentInfos', this.studentInfos);
        })
    }


}
