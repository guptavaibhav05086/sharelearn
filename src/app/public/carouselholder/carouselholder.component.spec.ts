import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselholderComponent } from './carouselholder.component';

describe('CarouselholderComponent', () => {
  let component: CarouselholderComponent;
  let fixture: ComponentFixture<CarouselholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
