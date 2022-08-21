import { TestBed } from '@angular/core/testing';

import { OnFidoService } from './on-fido.service';

describe('OnFidoService', () => {
    let service: OnFidoService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OnFidoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
