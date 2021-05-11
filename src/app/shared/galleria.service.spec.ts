import { TestBed } from '@angular/core/testing';

import { GalleriaService } from './galleria.service';

describe('GalleriaService', () => {
  let service: GalleriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
