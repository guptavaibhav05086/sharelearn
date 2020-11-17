import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImgesComponent } from './product-imges.component';

describe('ProductImgesComponent', () => {
  let component: ProductImgesComponent;
  let fixture: ComponentFixture<ProductImgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
