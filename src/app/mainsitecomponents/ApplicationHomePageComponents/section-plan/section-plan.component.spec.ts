import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPlanComponent } from './section-plan.component';

describe('SectionPlanComponent', () => {
  let component: SectionPlanComponent;
  let fixture: ComponentFixture<SectionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
