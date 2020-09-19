import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionProductDescriptionComponent } from './section-product-description.component';

describe('SectionProductDescriptionComponent', () => {
  let component: SectionProductDescriptionComponent;
  let fixture: ComponentFixture<SectionProductDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionProductDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionProductDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
