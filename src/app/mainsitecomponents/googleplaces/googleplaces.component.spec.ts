import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleplacesComponent } from './googleplaces.component';

describe('GoogleplacesComponent', () => {
  let component: GoogleplacesComponent;
  let fixture: ComponentFixture<GoogleplacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleplacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleplacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
