import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentnavbarcommonComponent } from './studentnavbarcommon.component';

describe('StudentnavbarcommonComponent', () => {
  let component: StudentnavbarcommonComponent;
  let fixture: ComponentFixture<StudentnavbarcommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentnavbarcommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentnavbarcommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
