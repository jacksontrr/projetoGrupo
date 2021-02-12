import { TestBed } from '@angular/core/testing';

import { FormulariocliService } from './formulariocli.service';

describe('FormulariocliService', () => {
  let service: FormulariocliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulariocliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
