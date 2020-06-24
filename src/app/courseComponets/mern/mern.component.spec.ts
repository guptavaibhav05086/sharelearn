import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MernComponent } from './mern.component';

describe('MernComponent', () => {
  let component: MernComponent;
  let fixture: ComponentFixture<MernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MernComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
