import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsuccessdetailsComponent } from './transactionsuccessdetails.component';

describe('TransactionsuccessdetailsComponent', () => {
  let component: TransactionsuccessdetailsComponent;
  let fixture: ComponentFixture<TransactionsuccessdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsuccessdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsuccessdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
