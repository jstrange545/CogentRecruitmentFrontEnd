import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationUnassignedTableComponent } from './application-unassigned-table.component';

describe('ApplicationUnassignedTableComponent', () => {
  let component: ApplicationUnassignedTableComponent;
  let fixture: ComponentFixture<ApplicationUnassignedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationUnassignedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationUnassignedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
