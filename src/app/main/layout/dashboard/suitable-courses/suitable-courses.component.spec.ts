import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitableCoursesComponent } from './suitable-courses.component';

describe('SuitableCoursesComponent', () => {
  let component: SuitableCoursesComponent;
  let fixture: ComponentFixture<SuitableCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitableCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitableCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
