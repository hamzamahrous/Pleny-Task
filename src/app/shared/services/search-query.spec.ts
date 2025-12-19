import { TestBed } from '@angular/core/testing';

import { SearchQuery } from './search-query';

describe('SearchQuery', () => {
  let service: SearchQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchQuery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
