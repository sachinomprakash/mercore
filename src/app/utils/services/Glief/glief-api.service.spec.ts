import { TestBed } from '@angular/core/testing';

import { GliefApiService } from './glief-api.service';

describe('GliefApiService', () => {
    let service: GliefApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GliefApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
