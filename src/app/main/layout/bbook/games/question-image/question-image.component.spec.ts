import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionImageComponent } from './question-image.component';

describe('QuestionImageComponent', () => {
  let component: QuestionImageComponent;
  let fixture: ComponentFixture<QuestionImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
