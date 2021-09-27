import { TestBed } from '@angular/core/testing';

import { PayerService } from './payer.service';

describe('PayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayerService = TestBed.get(PayerService);
    expect(service).toBeTruthy();
  });
});
