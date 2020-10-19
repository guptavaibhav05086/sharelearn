import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrinterProfileComponent } from './view-printer-profile.component';

describe('ViewPrinterProfileComponent', () => {
  let component: ViewPrinterProfileComponent;
  let fixture: ComponentFixture<ViewPrinterProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrinterProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrinterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
