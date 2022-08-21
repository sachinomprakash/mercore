import { TestBed } from '@angular/core/testing';

import { CddServiceService } from './cdd-service.service';

describe('CddServiceService', () => {
    let service: CddServiceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CddServiceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
