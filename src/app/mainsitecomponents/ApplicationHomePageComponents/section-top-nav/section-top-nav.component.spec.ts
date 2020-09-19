import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTopNavComponent } from './section-top-nav.component';

describe('SectionTopNavComponent', () => {
  let component: SectionTopNavComponent;
  let fixture: ComponentFixture<SectionTopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionTopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
