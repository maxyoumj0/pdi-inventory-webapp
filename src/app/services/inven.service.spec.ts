import { TestBed } from '@angular/core/testing';

import { InvenService } from './inven.service';

describe('InvenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvenService = TestBed.get(InvenService);
    expect(service).toBeTruthy();
  });
});
