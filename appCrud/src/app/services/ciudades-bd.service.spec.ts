import { TestBed } from '@angular/core/testing';

import { CiudadesBDService } from './ciudades-bd.service';

describe('CiudadesBdService', () => {
  let service: CiudadesBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiudadesBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
