import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionProductsComponent } from './section-products.component';

describe('SectionProductsComponent', () => {
  let component: SectionProductsComponent;
  let fixture: ComponentFixture<SectionProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
