import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavuserloginComponent } from './topnavuserlogin.component';

describe('TopnavuserloginComponent', () => {
  let component: TopnavuserloginComponent;
  let fixture: ComponentFixture<TopnavuserloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopnavuserloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavuserloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
