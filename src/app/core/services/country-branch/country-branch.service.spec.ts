import { TestBed } from '@angular/core/testing';

import { CountryBranchService } from './country-branch.service';

describe('CountryBranchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryBranchService = TestBed.get(CountryBranchService);
    expect(service).toBeTruthy();
  });
});
