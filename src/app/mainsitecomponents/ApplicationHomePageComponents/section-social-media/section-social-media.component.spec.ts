import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSocialMediaComponent } from './section-social-media.component';

describe('SectionSocialMediaComponent', () => {
  let component: SectionSocialMediaComponent;
  let fixture: ComponentFixture<SectionSocialMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionSocialMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
