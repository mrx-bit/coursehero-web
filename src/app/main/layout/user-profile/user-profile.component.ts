import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../../core/route-animation/route.animation';
import {PageTitleService} from '../../../core/page-title/page-title.service';
import {User} from '../../../core/model/alippe/user';
import {Subject} from 'rxjs';
import {ServiceCommonConstant} from '../../../core/constant/service-common.constant';
import {ActivatedRoute} from '@angular/router';
import {UserProfileService} from './user-profile.service';
import {FormGroup} from '@angular/forms';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-userprofile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})
export class UserProfileComponent implements OnInit, OnDestroy {

    user: User;
    subscription: any;
    private _unsubscribeAll: Subject<any>;
    baseUrl = ServiceCommonConstant.adminModuleUrl;
    private userId: any;
    fileToUpload: any;
    bookForm: FormGroup;


    constructor(private pageTitleService: PageTitleService,
                private route: ActivatedRoute,
                private _userProfileService: UserProfileService) {

        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit() {


        this.subscription = this.route.params
            .subscribe((params) => {
                this.userId = params['userId'];
                this.getUser(this.userId);
            });


        this.pageTitleService.setTitle('User Profile');


    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

    }


    upload(): FormData {
        const input = new FormData();
        input.append('file', this.fileToUpload);
        return input;
    }


    addFile(): void {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
            if (fileUpload.files && fileUpload.files[0]) {
                this.fileToUpload = fileUpload.files[0];
                this.uploadFile();

            }
        };

        fileUpload.click();
    }

    uploadFile(): void {
        this._userProfileService.uploadFile(this.fileToUpload, this.userId).subscribe(res => {

        });
    }

    getUser(id): void {
        this._userProfileService.getUser(id).pipe().subscribe(response => {
            this.user = response;
            console.log('user', this.user);
        });
    }
}
