import { TestBed } from '@angular/core/testing';

import { TeamsServiceService } from './teams-service.service';

describe('TeamsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamsServiceService = TestBed.get(TeamsServiceService);
    expect(service).toBeTruthy();
  });
});
