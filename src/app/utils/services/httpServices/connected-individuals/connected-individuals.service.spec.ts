import { TestBed } from '@angular/core/testing';

import { ConnectedIndividualsService } from './connected-individuals.service';

describe('ConnectedIndividualsService', () => {
    let service: ConnectedIndividualsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConnectedIndividualsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
