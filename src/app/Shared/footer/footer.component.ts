import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    onClick() {
        const first = location.pathname.split('/')[1];
        if (first === 'horizontal') {
            this.router.navigate(['/horizontal/dashboard/crm']);
        } else {
            this.router.navigate(['/dashboard/crm']);
        }
    }

}
