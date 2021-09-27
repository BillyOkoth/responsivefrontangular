import { TestBed } from '@angular/core/testing';

import { BillerTeamService } from './biller-team.service';

describe('BillerTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillerTeamService = TestBed.get(BillerTeamService);
    expect(service).toBeTruthy();
  });
});
