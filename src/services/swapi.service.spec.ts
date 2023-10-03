import { TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';
import { HttpClient } from '@angular/common/http';

// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorHandler } from './http-error-handler.service';

describe('SwapiService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let swapiService: SwapiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [HttpClientTestingModule],
            // Provide the service-under-test and its dependencies
            providers: [SwapiService, HttpErrorHandler],
        });
        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        swapiService = TestBed.inject(SwapiService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
