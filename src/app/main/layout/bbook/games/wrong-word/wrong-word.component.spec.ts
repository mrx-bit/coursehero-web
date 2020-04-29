import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WrongWordComponent} from './wrong-word.component';

describe('WrongWordComponent', () => {
    let component: WrongWordComponent;
    let fixture: ComponentFixture<WrongWordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WrongWordComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WrongWordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
