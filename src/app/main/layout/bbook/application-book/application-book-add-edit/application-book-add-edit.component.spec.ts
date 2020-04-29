import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBookAddEditComponent } from './application-book-add-edit.component';

describe('ApplicationBookAddEditComponent', () => {
  let component: ApplicationBookAddEditComponent;
  let fixture: ComponentFixture<ApplicationBookAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationBookAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationBookAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
