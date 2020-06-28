import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazorpaymentsComponent } from './razorpayments.component';

describe('RazorpaymentsComponent', () => {
  let component: RazorpaymentsComponent;
  let fixture: ComponentFixture<RazorpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazorpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazorpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
