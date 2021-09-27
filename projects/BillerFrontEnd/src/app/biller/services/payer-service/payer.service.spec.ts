import { TestBed } from '@angular/core/testing';

import { PayerService } from './payer.service';

describe('PayerService', () => {
  let service: PayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
