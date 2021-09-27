import { TestBed } from '@angular/core/testing';

import { BillerService } from './biller.service';

describe('BillerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillerService = TestBed.get(BillerService);
    expect(service).toBeTruthy();
  });
});
