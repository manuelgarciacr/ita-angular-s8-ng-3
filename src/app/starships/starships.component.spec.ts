import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { StarshipsComponent } from './starships.component';
import { SwapiService } from 'src/services/swapi.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IStarship } from 'src/model/IStarship';
import { ISwapiResp } from 'src/model/ISwapiResp';
import { delay, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StarshipComponent } from './starship/starship.component';

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
    { ...starship, name: "A", url: "URL A" },
    { ...starship, name: "B", url: "URL B"},
];
const swapiResponse01: ISwapiResp = {
    count: 2,
    next: "https://swapi.dev/api/starships/?page=2",
    previous: null,
    results: expectedStarships01,
};

describe('StarshipsComponent', () => {
    let httpTestingController: HttpTestingController;
    let swapiService: SwapiService;
    let modalService: NgbModal;
    let fixture: ComponentFixture<StarshipsComponent>;
    let comp: StarshipsComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [HttpClientTestingModule],
        });

        // Inject the test controller, swapiServer (DI), and
        // component-under-test
        // as they will be referenced by each test.
        httpTestingController = TestBed.inject(HttpTestingController);
        swapiService = TestBed.inject(SwapiService);
        modalService = TestBed.inject(NgbModal);
        fixture = TestBed.createComponent(StarshipsComponent);
        comp = fixture.componentInstance;
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('should create', () => {
        expect(comp).toBeTruthy();
        expect(comp).toBeDefined();
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((comp as any).nextPage)
            .withContext("nextPage property")
            .toBe(null); // Private property
        expect(comp.starships).withContext('starships property').toEqual([]);
        expect(comp.showGoUpButton)
            .withContext('showGoUpButton property')
            .toBe(false);
        expect(comp.loading).withContext('loading property').toBe(false);

        // Run getStarships(), but swapiService has a 1ms delay
        comp.ngOnInit();

        // Due to the delay, the 'loading' switch is still set to true
        expect(comp.loading).withContext('loading property while loading data').toBe(true);

        tick(1); //The 1ms delay ends. (fakeAsync)
        flush(); // Flushes all pending microtasks (fakeAsync)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((comp as any).nextPage)
            .withContext('nextPage property after loading data')
            .toBe('https://swapi.dev/api/starships/?page=2'); // Private property
        expect(comp.starships)
            .withContext('starships property after loading data')
            .toEqual(expectedStarships01);
        expect(comp.showGoUpButton)
            .withContext('showGoUpButton property after loading data')
            .toBe(false);
        expect(comp.loading)
            .withContext('loading property after loading data')
            .toBe(false);

    }))

    it('click on the second spaceship card', fakeAsync(() => {
        spyOn(swapiService, 'getStarshipsByUrl')
            .withArgs(null)
            .and.returnValue(
                of(
                    new HttpResponse<ISwapiResp>({ body: swapiResponse01 })
                )
            );

        fixture.detectChanges();

        const hostDe = fixture.debugElement;
        const cardsDe = hostDe.queryAll(By.css('.card'));

        expect(cardsDe?.length).withContext("Number of cards").toBe(2);

        const cardDe = cardsDe![1];
        const title = cardDe.query(By.css('h5.card-title')).nativeElement as HTMLElement;

        expect(title.textContent)
            .withContext('The starship name must be B')
            .toContain('B');

        modalService.activeInstances.subscribe((v) => {
            const starship = v[0]?.componentInstance as StarshipComponent;

            setTimeout(
                () =>
                    expect(starship.url)
                        .withContext('Modal opened')
                        .toBe('URL B'),
                1000
            );
        });

        cardDe.triggerEventHandler('click');

        flush();
    }))

    it('cscrolling', fakeAsync(() => {
        spyOn(swapiService, 'getStarshipsByUrl')
            .withArgs(null)
            .and.returnValue(
                of(
                    new HttpResponse<ISwapiResp>({ body: swapiResponse01 })
                )
            );

        fixture.detectChanges();

        expect(comp.showGoUpButton).withContext("The GoUp button should not be shown").toBe(false);

        window.scrollY = 401;
        comp.onWindowScroll()

        expect(comp.showGoUpButton)
            .withContext('The GoUp button should be shown')
            .toBe(true);

        window.scrollY = 199;
        comp.onWindowScroll();

        expect(comp.showGoUpButton)
            .withContext('The GoUp button should not be shown')
            .toBe(false);

        comp.scrollTop()

        expect(window.scrollY)
            .withContext('User pressed GoUp button and scrolled up')
            .toBe(0);
    }))

});
