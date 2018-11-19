import { TestBed } from '@angular/core/testing';

import { GetDrinkerTransactionsService } from './get-drinker-transactions.service';

describe('GetDrinkerTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDrinkerTransactionsService = TestBed.get(GetDrinkerTransactionsService);
    expect(service).toBeTruthy();
  });
});
