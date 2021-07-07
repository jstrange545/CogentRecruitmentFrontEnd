import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPortalComponent } from './recruiter-portal.component';

describe('RecruiterComponent', () => {
  let component: RecruiterPortalComponent;
  let fixture: ComponentFixture<RecruiterPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterPortalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
