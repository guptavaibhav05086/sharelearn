import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricbannerComponent } from './fabricbanner.component';

describe('FabricbannerComponent', () => {
  let component: FabricbannerComponent;
  let fixture: ComponentFixture<FabricbannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricbannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
