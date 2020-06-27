import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarcommonComponent } from './navbarcommon.component';

describe('NavbarcommonComponent', () => {
  let component: NavbarcommonComponent;
  let fixture: ComponentFixture<NavbarcommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarcommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarcommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
