import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomelinkPageComponent } from './homelink-page.component';

describe('HomelinkPageComponent', () => {
  let component: HomelinkPageComponent;
  let fixture: ComponentFixture<HomelinkPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomelinkPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomelinkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
