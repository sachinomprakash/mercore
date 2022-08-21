import { TestBed } from '@angular/core/testing';

import { CipService } from './cip.service';

describe('CipService', () => {
    let service: CipService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CipService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
