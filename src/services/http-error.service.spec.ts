import { TestBed } from '@angular/core/testing';

import { HttpErrorHandler } from './http-error-handler.service';

describe('HttpErrorService', () => {
    let service: HttpErrorHandler;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HttpErrorHandler);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
