import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveOrderDetailsComponent } from './active-order-details.component';

describe('ActiveOrderDetailsComponent', () => {
  let component: ActiveOrderDetailsComponent;
  let fixture: ComponentFixture<ActiveOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
