import { TestBed } from '@angular/core/testing';

import { FamosotagsService } from './famosotags.service';

describe('FamosotagsService', () => {
  let service: FamosotagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamosotagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
