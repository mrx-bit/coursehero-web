import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PutLetterComponent} from './put-letter.component';

describe('PutLetterComponent', () => {
    let component: PutLetterComponent;
    let fixture: ComponentFixture<PutLetterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PutLetterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PutLetterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
