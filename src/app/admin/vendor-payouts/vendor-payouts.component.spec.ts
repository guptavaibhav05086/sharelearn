import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPayoutsComponent } from './vendor-payouts.component';

describe('VendorPayoutsComponent', () => {
  let component: VendorPayoutsComponent;
  let fixture: ComponentFixture<VendorPayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
