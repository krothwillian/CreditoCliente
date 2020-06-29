import { TestBed } from '@angular/core/testing';

import { ClienteConsultaService } from './cliente-consulta.service';

describe('ClienteConsultaService', () => {
  let service: ClienteConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
