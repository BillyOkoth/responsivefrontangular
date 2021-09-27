import { TestBed } from '@angular/core/testing';

import { MyAccountsService } from './my-accounts.service';

describe('MyAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyAccountsService = TestBed.get(MyAccountsService);
    expect(service).toBeTruthy();
  });
});
