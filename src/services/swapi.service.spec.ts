import { TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';
import { HttpErrorResponse } from '@angular/common/http';

// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IStarship } from 'src/model/IStarship';
import { ISwapiResp } from 'src/model/ISwapiResp';

describe('SwapiService', () => {
    let httpTestingController: HttpTestingController;
    let swapiService: SwapiService;
    beforeEach(() => {

        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [HttpClientTestingModule],
            providers: [SwapiService],
        });

        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpTestingController = TestBed.inject(HttpTestingController);
        swapiService = TestBed.inject(SwapiService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(swapiService).toBeTruthy();
    });

    it('checkUrl function', () => {
        const operation = 'Test';
        const endPoint = 'endpoint';
        const arrUrl = [
            'https://swapi.dev/api/endpoint/1/',
            'https://swapi.dev/api/endpoint/1',
            'https://swapi.dev/api/endpoint/',
            'https://swapi.dev/api/endpoint',
        ];

        arrUrl.forEach((url) => {
            expect(swapiService.checkUrl(operation, endPoint, url)).toBe(true);
        });

        expect(swapiService.checkUrl(operation, endPoint, '')).toBe(false);
        expect(
            swapiService.checkUrl(
                operation,
                endPoint,
                'https://swapi.dev/api/endpoi'
            )
        ).toBe(false);
    });

    // synchronous function
    it('shouldRetry function', () => {
        const error404 = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404,
            statusText: 'Not Found',
        });
        const error0 = new HttpErrorResponse({
            // CORS error
            error: 'test CORS error',
            status: 0,
            statusText: 'Not Found',
        });

        expect(() => swapiService.shouldRetry(error404)).toThrow(error404);
        swapiService
            .shouldRetry(error0)
            .subscribe((result) => expect(result).toBe(0));

        const t0 = Date.now();
        const obs$ = swapiService.shouldRetry(error0);

        obs$.subscribe(() => {
            const t1 = Date.now();
            expect(t1 - t0).toBeGreaterThanOrEqual(1000);
        });
        obs$.subscribe(() => {
            const t1 = Date.now();
            expect(t1 - t0).toBeLessThanOrEqual(1050);
        });
    });

    /// SwapiService method tests ///
    describe('getStarshipsByUrl', () => {
        const starship = {
            name: '',
            model: '',
            manufacturer: '',
            cost_in_credits: '',
            length: '',
            max_atmosphering_speed: '',
            crew: '',
            passengers: '',
            cargo_capacity: '',
            consumables: '',
            hyperdrive_rating: '',
            MGLT: '',
            starship_class: '',
            pilots: [],
            films: [],
            created: '',
            edited: '',
            url: '',
        };
        const expectedStarships: IStarship[] = [
            { ...starship, name: 'A' },
            { ...starship, name: 'B' },
        ];
        const swapiResponse: ISwapiResp = {
            count: 2,
            next: null,
            previous: null,
            results: expectedStarships,
        };

        it('should return expected starships (called once)', () => {
            swapiService.getStarshipsByUrl(null).subscribe({
                next: (response) =>
                    expect(response.body)
                        .withContext('should return expected starships')
                        .toEqual(swapiResponse),
                error: fail,
            });

            // SwapiService should have made one request to GET starships from expected URL
            const req = httpTestingController.expectOne(
                swapiService.url + '/starships'
            );

            expect(req.request.method).toEqual('GET');

            // Respond with the mock starships response
            req.flush(swapiResponse);
        });

        it('should return expected starship. Name "B" (called once)', () => {
            const url = 'https://swapi.dev/api/starships/B';
            const swp: ISwapiResp = {
                count: 1,
                next: null,
                previous: null,
                results: swapiResponse.results.filter((v) => v.name == 'B'),
            };

            swapiService.getStarshipsByUrl(url).subscribe({
                next: (response) => {
                    expect(response.body)
                        .withContext('should return expected starship. Name "B"')
                        .toEqual(swp)
                },
                error: fail,
            });

            // SwapiService should have made one request to GET starships from expected URL
            const req = httpTestingController.expectOne(
                swapiService.url + '/starships/B'
            );

            expect(req.request.method).toEqual('GET');

            req.flush(swp);
        });

        it('should be OK returning no starships', () => {
            swapiService.getStarshipsByUrl(null).subscribe({
                next: (response) =>
                    expect(response.body?.results)
                        .withContext('should have empty starships array')
                        .toEqual([]),
                error: fail,
            });

            const req = httpTestingController.expectOne(
                swapiService.url + '/starships'
            );

            swapiResponse.results = [];

            req.flush(swapiResponse); // Respond with no starships
        });

        it('should turn 404 into a normal response with no starships. Status is 200 and body is null ', () => {
            const msg = 'Deliberate 404';

            swapiService.getStarshipsByUrl(null).subscribe({
                //next: (response) => fail('expected to fail'),
                next: (response) => {
                    expect(response.body)
                        .withContext('should have null body')
                        .toEqual(null)
                    expect(response.status)
                        .withContext('should have null body')
                        .toEqual(200);
                },
                error: (error) => expect(error.message).toContain(msg),
            });

            const req = httpTestingController.expectOne(
                swapiService.url + '/starships'
            );

            // respond with a 404 and the error message in the body
            req.flush(msg, { status: 404, statusText: 'Not Found' });
        });

        it('should return expected starships (called multiple times)', () => {
            swapiService.getStarshipsByUrl(null).subscribe();
            swapiService.getStarshipsByUrl(null).subscribe();
            swapiService.getStarshipsByUrl(null).subscribe({
                next: (response) =>
                    expect(response.body)
                        .withContext('should return expected starships')
                        .toEqual(swapiResponse),
                error: fail,
            });

            const requests = httpTestingController.match(
                swapiService.url + '/starships'
            );
            expect(requests.length)
                .withContext('calls to getStarshipsByUrl(null)')
                .toEqual(3);

            // Respond to each request with different mock starships results
            requests[0].flush([]);
            requests[1].flush([{ id: 1, name: 'bob' }]);
            requests[2].flush(swapiResponse);
        });

    });
});

