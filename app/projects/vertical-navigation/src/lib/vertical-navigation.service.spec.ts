import { TestBed } from '@angular/core/testing';

import { VerticalNavigationService } from './vertical-navigation.service';

describe('VerticalNavigationService', () => {
  let service: VerticalNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerticalNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
