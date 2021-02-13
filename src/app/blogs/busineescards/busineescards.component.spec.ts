import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusineescardsComponent } from './busineescards.component';

describe('BusineescardsComponent', () => {
  let component: BusineescardsComponent;
  let fixture: ComponentFixture<BusineescardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusineescardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusineescardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
