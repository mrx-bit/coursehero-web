import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PromoCodeGenerateComponent} from './promo-code-generate.component';

describe('PromoCodeGenerateComponent', () => {
    let component: PromoCodeGenerateComponent;
    let fixture: ComponentFixture<PromoCodeGenerateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PromoCodeGenerateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PromoCodeGenerateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
