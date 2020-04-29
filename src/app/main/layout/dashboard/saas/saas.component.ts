import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fadeInAnimation} from '../../../../core/route-animation/route.animation';
import {PageTitleService} from '../../../../core/page-title/page-title.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-dashboard',
    templateUrl: './saas-component.html',
    styleUrls: ['./saas-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})



export class SaasComponent implements OnInit {


    sources: Array<Object>;

    ideaCount = 0;
    commentCount = 0;

    feedbackList: any [] = [
        {
            type: 'comment',
            image : 'assets/img/user-1.jpg',
            name : 'Ramona Smith',
            comment : 'You Will Never Believe These Bizarre Truth Of',
            feedback : 'Lorem ipsum dolor sit amet consectetur',
            time : '8 hours ago'
        }
    ];



    constructor(private pageTitleService: PageTitleService) {

        this.sources = [
            {
                src: 'assets/audio/SampleAudio_0.4mb.mp3',
                type: 'audio/mp3'
            }
        ];


    }
    ngOnInit(): void {
        this.pageTitleService.setTitle('Home');
    }
}
