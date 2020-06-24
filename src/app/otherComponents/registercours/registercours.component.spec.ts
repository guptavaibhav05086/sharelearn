import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistercoursComponent } from './registercours.component';

describe('RegistercoursComponent', () => {
  let component: RegistercoursComponent;
  let fixture: ComponentFixture<RegistercoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistercoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistercoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
