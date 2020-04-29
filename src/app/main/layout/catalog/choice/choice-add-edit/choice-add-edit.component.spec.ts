import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChoiceAddEditComponent} from './choice-add-edit.component';

describe('ChoiceAddEditComponent', () => {
    let component: ChoiceAddEditComponent;
    let fixture: ComponentFixture<ChoiceAddEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChoiceAddEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChoiceAddEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
