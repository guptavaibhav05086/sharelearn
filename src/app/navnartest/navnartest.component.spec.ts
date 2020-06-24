import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavnartestComponent } from './navnartest.component';

describe('NavnartestComponent', () => {
  let component: NavnartestComponent;
  let fixture: ComponentFixture<NavnartestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavnartestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavnartestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
