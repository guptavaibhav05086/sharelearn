import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusPopupComponent } from './aboutus-popup.component';

describe('AboutusPopupComponent', () => {
  let component: AboutusPopupComponent;
  let fixture: ComponentFixture<AboutusPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutusPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
