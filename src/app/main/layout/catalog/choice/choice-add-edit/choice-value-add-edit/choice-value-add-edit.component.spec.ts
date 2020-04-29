import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChoiceValueAddEditComponent} from './choice-value-add-edit.component';

describe('ChoiceValueAddEditComponent', () => {
    let component: ChoiceValueAddEditComponent;
    let fixture: ComponentFixture<ChoiceValueAddEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChoiceValueAddEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChoiceValueAddEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
