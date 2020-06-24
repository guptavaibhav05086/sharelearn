import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintersignupComponent } from './printersignup.component';

describe('PrintersignupComponent', () => {
  let component: PrintersignupComponent;
  let fixture: ComponentFixture<PrintersignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintersignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
