import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDescriptionComponent } from './price-description.component';

describe('PriceDescriptionComponent', () => {
  let component: PriceDescriptionComponent;
  let fixture: ComponentFixture<PriceDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
