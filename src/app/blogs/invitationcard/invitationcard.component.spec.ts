import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationcardComponent } from './invitationcard.component';

describe('InvitationcardComponent', () => {
  let component: InvitationcardComponent;
  let fixture: ComponentFixture<InvitationcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
