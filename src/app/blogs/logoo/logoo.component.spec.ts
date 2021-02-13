import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogooComponent } from './logoo.component';

describe('LogooComponent', () => {
  let component: LogooComponent;
  let fixture: ComponentFixture<LogooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
