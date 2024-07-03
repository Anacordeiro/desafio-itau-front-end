import { TestBed } from '@angular/core/testing';

import { CloudwatchLoggerService } from './cloudwatch-logger.service';

describe('CloudwatchLoggerService', () => {
  let service: CloudwatchLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudwatchLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
