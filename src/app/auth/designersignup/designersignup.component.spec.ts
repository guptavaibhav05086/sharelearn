import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignersignupComponent } from './designersignup.component';

describe('DesignersignupComponent', () => {
  let component: DesignersignupComponent;
  let fixture: ComponentFixture<DesignersignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignersignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
