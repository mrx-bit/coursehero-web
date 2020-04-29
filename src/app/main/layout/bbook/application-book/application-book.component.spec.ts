import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplicationBookComponent} from './application-book.component';

describe('ApplicationBookComponent', () => {
    let component: ApplicationBookComponent;
    let fixture: ComponentFixture<ApplicationBookComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApplicationBookComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationBookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
