import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrainingAidarComponent} from './training-aidar.component';

describe('TrainingAidarComponent', () => {
    let component: TrainingAidarComponent;
    let fixture: ComponentFixture<TrainingAidarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrainingAidarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrainingAidarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
