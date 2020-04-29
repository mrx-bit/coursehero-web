import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContentCrudComponent} from './content-crud.component';

describe('ContentCrudComponent', () => {
    let component: ContentCrudComponent;
    let fixture: ComponentFixture<ContentCrudComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContentCrudComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentCrudComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
