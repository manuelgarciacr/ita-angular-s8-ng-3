import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { StarshipsComponent } from './starships.component';
import { SwapiService } from 'src/services/swapi.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IStarship } from 'src/model/IStarship';
import { ISwapiResp } from 'src/model/ISwapiResp';
import { delay, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

const starship = {
    name: "",
    model: "",
    manufacturer: "",
    cost_in_credits: "",
    length: "",
    max_atmosphering_speed: "",
    crew: "",
    passengers: "",
    cargo_capacity: "",
    consumables: "",
    hyperdrive_rating: "",
    MGLT: "",
    starship_class: "",
    pilots: [],
    films: [],
    created: "",
    edited: "",
    url: "",
};
const expectedStarships01: IStarship[] = [
    { ...starship, name: "A" },
    { ...starship, name: "B" },
];
const expectedStarships02: IStarship[] = [
    { ...starship, name: "C" },
    { ...starship, name: "D" },
];
const swapiResponse01: ISwapiResp = {
    count: 2,
    next: "https://swapi.dev/api/starships/?page=2",
    previous: null,
    results: expectedStarships01,
};
const swapiResponse02: ISwapiResp = {
    count: 2,
    next: null,
    previous: "https://swapi.dev/api/starships/?page=1",
    results: expectedStarships02,
};


describe('StarshipsComponent', () => {
    let httpTestingController: HttpTestingController;
    let swapiService: SwapiService;
    let comp: StarshipsComponent;
    let fixture: ComponentFixture<StarshipsComponent>;
    const flushStarships = () => {
        // SwapiService should have made one request to GET starships from expected URL
        const req = httpTestingController.expectOne(
            swapiService.url + "/starships"
        );

        expect(req.request.method).toEqual("GET");

        // Respond with the mock starships response
        req.flush(swapiResponse01);
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [HttpClientTestingModule],
            //providers: [SwapiService],
        });

        // Inject the test controller, swapiServer (DI), and
        // component-under-test
        // as they will be referenced by each test.
        httpTestingController = TestBed.inject(HttpTestingController);
        swapiService = TestBed.inject(SwapiService);
        fixture = TestBed.createComponent(StarshipsComponent);
        //fixture.detectChanges(); // Executes ngOnInit
        comp = fixture.componentInstance;
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    // beforeEach(() => {
    //     TestBed.configureTestingModule({
    //         imports: [StarshipsComponent],
    //         providers: [{ provide: SwapiService, useClass: MockSwapiService }],
    //     });
    //     fixture = TestBed.createComponent(StarshipsComponent);
    //     component = fixture.componentInstance;
    //     swapiService = TestBed.inject(SwapiService);
    //     fixture.detectChanges();
    // });

    it('should create', () => {
        expect(comp).toBeTruthy();

        //flushStarships()
    });

    it('Initial state', fakeAsync(() => {
        spyOn(swapiService, "getStarshipsByUrl")
            .withArgs(null)
            .and.returnValue(
                of(
                    new HttpResponse<ISwapiResp>({ body: swapiResponse01 })
                ).pipe(
                    delay(1) // 1ms delay
                )
            );

        expect((comp as any).nextPage)
            .withContext("nextPage")
            .toBe(null); // Private property
        expect(comp.starships).withContext("starships").toEqual([]);
        expect(comp.showGoUpButton).withContext("showGoUpButton").toBe(false);
        expect(comp.loading).withContext("loading").toBe(false);

        // Run getStarships(), but swapiService has a 1ms delay
        comp.ngOnInit();

        // Due to the delay, the 'loading' switch is still set to true
        expect(comp.loading).withContext("loading while").toBe(true);

        tick(1); //The 1ms delay ends. (fakeAsync)
        flush(); // Flushes all pending microtasks (fakeAsync)

        expect((comp as any).nextPage)
            .withContext("nextPage after")
            .toBe("https://swapi.dev/api/starships/?page=2"); // Private property
        expect(comp.starships)
            .withContext("starships after")
            .toEqual(expectedStarships01);
        expect(comp.showGoUpButton)
            .withContext("showGoUpButton after")
            .toBe(false);
        expect(comp.loading).withContext("loading after").toBe(false);

        //comp.ngOnInit();

        //flush();
        //flushStarships();
    }))
});
