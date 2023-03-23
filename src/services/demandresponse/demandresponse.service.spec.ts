import { TestBed } from '@angular/core/testing';

import { DemandresponseService } from './demandresponse.service';

describe('DemandresponseService', () => {
  let service: DemandresponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandresponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
