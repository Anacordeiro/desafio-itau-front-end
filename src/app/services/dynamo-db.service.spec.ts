import { TestBed } from '@angular/core/testing';

import { DynamoDBService } from './dynamo-db.service';

describe('DynaboDbService', () => {
  let service: DynamoDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamoDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
