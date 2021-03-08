import { TestBed } from '@angular/core/testing';

import { ResultTableService } from './result-table.service';

describe('ResultTableService', () => {
  let service: ResultTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
