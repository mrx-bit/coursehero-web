import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OddImgComponent} from './odd-img.component';

describe('OddImgComponent', () => {
    let component: OddImgComponent;
    let fixture: ComponentFixture<OddImgComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OddImgComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OddImgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
