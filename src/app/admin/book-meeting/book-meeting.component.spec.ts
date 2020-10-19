import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMeetingComponent } from './book-meeting.component';

describe('BookMeetingComponent', () => {
  let component: BookMeetingComponent;
  let fixture: ComponentFixture<BookMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
