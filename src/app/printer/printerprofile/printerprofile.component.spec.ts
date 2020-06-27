import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterprofileComponent } from './printerprofile.component';

describe('PrinterprofileComponent', () => {
  let component: PrinterprofileComponent;
  let fixture: ComponentFixture<PrinterprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
