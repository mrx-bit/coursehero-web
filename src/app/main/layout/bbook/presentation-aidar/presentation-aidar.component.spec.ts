import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PresentationAidarComponent} from './presentation-aidar.component';

describe('PresentationAidarComponent', () => {
    let component: PresentationAidarComponent;
    let fixture: ComponentFixture<PresentationAidarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PresentationAidarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PresentationAidarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
