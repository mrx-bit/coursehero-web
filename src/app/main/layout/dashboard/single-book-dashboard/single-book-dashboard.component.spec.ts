import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleBookDashboardComponent} from './single-book-dashboard.component';

describe('SingleBookDashboardComponent', () => {
    let component: SingleBookDashboardComponent;
    let fixture: ComponentFixture<SingleBookDashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SingleBookDashboardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleBookDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
