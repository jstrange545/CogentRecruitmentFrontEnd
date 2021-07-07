import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantPortalComponent } from './applicant-portal.component';

describe('ApplicantPortalComponent', () => {
  let component: ApplicantPortalComponent;
  let fixture: ComponentFixture<ApplicantPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantPortalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
