import { TestBed } from '@angular/core/testing';

import { ApplicationEvaluationService } from './application-evaluation.service';

describe('ApplicationEvaluationService', () => {
  let service: ApplicationEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
