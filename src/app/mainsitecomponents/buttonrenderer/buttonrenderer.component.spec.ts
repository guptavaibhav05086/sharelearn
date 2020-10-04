import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonrendererComponent } from './buttonrenderer.component';

describe('ButtonrendererComponent', () => {
  let component: ButtonrendererComponent;
  let fixture: ComponentFixture<ButtonrendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonrendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonrendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
