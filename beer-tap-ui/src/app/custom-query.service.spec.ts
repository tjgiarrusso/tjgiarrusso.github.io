import { TestBed } from '@angular/core/testing';

import { CustomQueryService } from './custom-query.service';

describe('CustomQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomQueryService = TestBed.get(CustomQueryService);
    expect(service).toBeTruthy();
  });
});
