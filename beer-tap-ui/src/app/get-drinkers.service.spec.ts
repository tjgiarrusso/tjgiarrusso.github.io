import { TestBed } from '@angular/core/testing';

import { GetDrinkersService } from './get-drinkers.service';

describe('GetDrinkersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDrinkersService = TestBed.get(GetDrinkersService);
    expect(service).toBeTruthy();
  });
});
