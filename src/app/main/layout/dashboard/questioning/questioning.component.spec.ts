import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioningComponent } from './questioning.component';

describe('QuestioningComponent', () => {
  let component: QuestioningComponent;
  let fixture: ComponentFixture<QuestioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
