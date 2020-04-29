import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookDetailNewComponent} from './book-detail-new.component';

describe('BookDetailNewComponent', () => {
    let component: BookDetailNewComponent;
    let fixture: ComponentFixture<BookDetailNewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BookDetailNewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookDetailNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
