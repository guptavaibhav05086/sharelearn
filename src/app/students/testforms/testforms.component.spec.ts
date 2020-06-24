import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestformsComponent } from './testforms.component';

describe('TestformsComponent', () => {
  let component: TestformsComponent;
  let fixture: ComponentFixture<TestformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
