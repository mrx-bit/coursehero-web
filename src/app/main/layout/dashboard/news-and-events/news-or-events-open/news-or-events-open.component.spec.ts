import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsOrEventsOpenComponent } from './news-or-events-open.component';

describe('NewsOrEventsOpenComponent', () => {
  let component: NewsOrEventsOpenComponent;
  let fixture: ComponentFixture<NewsOrEventsOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsOrEventsOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsOrEventsOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
