import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegsiterProfilesComponent } from './regsiter-profiles.component';

describe('RegsiterProfilesComponent', () => {
  let component: RegsiterProfilesComponent;
  let fixture: ComponentFixture<RegsiterProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegsiterProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegsiterProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
