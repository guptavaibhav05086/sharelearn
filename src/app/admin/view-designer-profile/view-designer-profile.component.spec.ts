import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDesignerProfileComponent } from './view-designer-profile.component';

describe('ViewDesignerProfileComponent', () => {
  let component: ViewDesignerProfileComponent;
  let fixture: ComponentFixture<ViewDesignerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDesignerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDesignerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
