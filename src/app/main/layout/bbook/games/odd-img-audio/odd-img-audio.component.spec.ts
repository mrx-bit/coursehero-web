import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OddImgAudioComponent} from './odd-img-audio.component';

describe('OddImgAudioComponent', () => {
    let component: OddImgAudioComponent;
    let fixture: ComponentFixture<OddImgAudioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OddImgAudioComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OddImgAudioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
