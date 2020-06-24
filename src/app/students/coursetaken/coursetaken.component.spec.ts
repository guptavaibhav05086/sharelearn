import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetakenComponent } from './coursetaken.component';

describe('CoursetakenComponent', () => {
  let component: CoursetakenComponent;
  let fixture: ComponentFixture<CoursetakenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursetakenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursetakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
