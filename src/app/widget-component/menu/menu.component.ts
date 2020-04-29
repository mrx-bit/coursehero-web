import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChoiceListService} from '../../main/layout/bbook/core/services/choice-list.service';
import {Router} from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    aidarTypeGames: any[] = [];
    @Input() bookId: any;
    aidarType: any[] = [];

    constructor(private _serviceChoiceList: ChoiceListService,
                private _router: Router,
    ) {
    }

    ngOnInit(): void {
        this.getTypes();
        this.getTypesGames();
    }

    getTypes(): void {
        this._serviceChoiceList.getChoice('realAidarType')
            .pipe()
            .subscribe(response => {
                this.aidarType = response.values;

            });
    }

    getTypesGames(): void {
        this._serviceChoiceList.getChoice('aidarType')
            .pipe()
            .subscribe(response => {
                this.aidarTypeGames = response.values;
            });
    }

    selectAidar(bookCode): void {
        this._router.navigate(['/dashboard/alippe/' + bookCode])
    }

}

