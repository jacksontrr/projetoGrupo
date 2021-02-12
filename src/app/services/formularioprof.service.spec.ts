import { TestBed } from '@angular/core/testing';

import { FormularioprofService } from './formularioprof.service';

describe('FormularioprofService', () => {
  let service: FormularioprofService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioprofService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
