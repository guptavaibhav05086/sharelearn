import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWePrintComponent } from './how-we-print.component';

describe('HowWePrintComponent', () => {
  let component: HowWePrintComponent;
  let fixture: ComponentFixture<HowWePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowWePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowWePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
