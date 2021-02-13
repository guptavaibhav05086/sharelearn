import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusineesenvelopeComponent } from './busineesenvelope.component';

describe('BusineesenvelopeComponent', () => {
  let component: BusineesenvelopeComponent;
  let fixture: ComponentFixture<BusineesenvelopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusineesenvelopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusineesenvelopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
