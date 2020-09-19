import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWeDesignComponent } from './how-we-design.component';

describe('HowWeDesignComponent', () => {
  let component: HowWeDesignComponent;
  let fixture: ComponentFixture<HowWeDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowWeDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowWeDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
