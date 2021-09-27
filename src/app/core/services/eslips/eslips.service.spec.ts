import { TestBed } from '@angular/core/testing';

import { EslipsService } from './eslips.service';

describe('EslipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EslipsService = TestBed.get(EslipsService);
    expect(service).toBeTruthy();
  });
});
