import { TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorHandler } from './http-error-handler.service';

describe('SwapiService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: SwapiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [HttpClientTestingModule],
        //     // Provide the service-under-test and its dependencies
        //     providers: [SwapiService, HttpErrorHandler],
        });
        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpClient = TestBed.inject(HttpClient);
        // httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(SwapiService);
    });

    // afterEach(() => {
    //     // After every test, assert that there are no more pending requests.
    //     // httpTestingController.verify();
    // });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('checkUrl function', () => {
        const operation = "Test";
        const endPoint = "endpoint";
        const arrUrl = [
            "https://swapi.dev/api/endpoint/1/",
            "https://swapi.dev/api/endpoint/1",
            "https://swapi.dev/api/endpoint/",
            "https://swapi.dev/api/endpoint",
        ];

        arrUrl.forEach(url => {
            expect(service.checkUrl(operation, endPoint, url)).toBe(true);
        })

        expect(service.checkUrl(operation, endPoint, "")).toBe(false);
        expect(
            service.checkUrl(
                operation,
                endPoint,
                "https://swapi.dev/api/endpoi"
            )
        ).toBe(false);

    })

    // synchronous function
    it("shouldRetry function", () => {
        const error404 = new HttpErrorResponse({
            error: "test 404 error",
            status: 404,
            statusText: "Not Found",
        });
        const error0 = new HttpErrorResponse({ // CORS error
            error: "test CORS error",
            status: 0,
            statusText: "Not Found",
        });

        expect(() => service.shouldRetry(error404)).toThrow(error404);
        service.shouldRetry(error0).subscribe(result => expect(result).toBe(0));

    });

    // asynchronous function
    // it('retrieves all the cars', waitForAsync(inject([CarService], (carService) => {
    //  carService.getCars().subscribe(result => expect(result.length).toBeGreaterThan(0));
    // }));

    it("getFilmByUrl function", () => {

        expect(() => service.shouldRetry(error404)).toThrow(error404);
        service.shouldRetry(error0).subscribe(result => expect(result).toBe(0));
    });

});

// describe("SwapiService", () => {
//     let httpClient: HttpClient;
//     let httpTestingController: HttpTestingController;
//     let service: SwapiService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             // Import the HttpClient mocking services
//             imports: [HttpClientTestingModule],
//             // Provide the service-under-test and its dependencies
//             providers: [SwapiService, HttpErrorHandler],
//         });
//         // Inject the http, test controller, and service-under-test
//         // as they will be referenced by each test.
//         httpClient = TestBed.inject(HttpClient);
//         httpTestingController = TestBed.inject(HttpTestingController);
//         service = TestBed.inject(SwapiService);
//     });

//     afterEach(() => {
//         // After every test, assert that there are no more pending requests.
//         httpTestingController.verify();
//     });

//     it("should be created", () => {
//         expect(service).toBeTruthy();
//     });

//     it("checkUrl function", () => {
//         const operation = "Test";
//         const endPoint = "endpoint";
//         const arrUrl = [
//             "https://swapi.dev/api/endpoint/1/",
//             "https://swapi.dev/api/endpoint/1",
//             "https://swapi.dev/api/endpoint/",
//             "https://swapi.dev/api/endpoint",
//         ];

//         arrUrl.forEach(url => {
//             expect(service.checkUrl(operation, endPoint, url)).toBe(true);
//         });

//         expect(service.checkUrl(operation, endPoint, "")).toBe(false);
//         expect(
//             service.checkUrl(
//                 operation,
//                 endPoint,
//                 "https://swapi.dev/api/endpoi"
//             )
//         ).toBe(false);
//     });
// });
