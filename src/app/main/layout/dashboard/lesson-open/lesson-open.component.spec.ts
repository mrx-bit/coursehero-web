import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonOpenComponent } from './lesson-open.component';

describe('LessonOpenComponent', () => {
  let component: LessonOpenComponent;
  let fixture: ComponentFixture<LessonOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
