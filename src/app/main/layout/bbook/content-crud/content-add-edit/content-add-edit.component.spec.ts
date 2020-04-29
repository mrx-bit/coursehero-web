import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContentAddEditComponent} from './content-add-edit.component';

describe('ContentAddEditComponent', () => {
    let component: ContentAddEditComponent;
    let fixture: ComponentFixture<ContentAddEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContentAddEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentAddEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
