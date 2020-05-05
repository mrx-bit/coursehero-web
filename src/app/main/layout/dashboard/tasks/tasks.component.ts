import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
    tasks = [1, 2, 3, 4]

    constructor() {
    }

    ngOnInit() {
    }

}
