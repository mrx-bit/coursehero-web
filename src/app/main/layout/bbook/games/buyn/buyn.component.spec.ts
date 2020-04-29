import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BuynComponent} from './buyn.component';

describe('BuynComponent', () => {
    let component: BuynComponent;
    let fixture: ComponentFixture<BuynComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BuynComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuynComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
