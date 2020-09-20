import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PproductsCarouselComponent } from './pproducts-carousel.component';

describe('PproductsCarouselComponent', () => {
  let component: PproductsCarouselComponent;
  let fixture: ComponentFixture<PproductsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PproductsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PproductsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
