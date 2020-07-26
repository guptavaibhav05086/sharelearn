import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRatesComponent } from './print-rates.component';

describe('PrintRatesComponent', () => {
  let component: PrintRatesComponent;
  let fixture: ComponentFixture<PrintRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
