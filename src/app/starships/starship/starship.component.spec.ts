import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { StarshipComponent } from './starship.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SwapiService } from 'src/services/swapi.service';
import { delay, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IStarship } from 'src/model/IStarship';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPilot } from 'src/model/IPilot';
import { IFilm } from 'src/model/IFilm';

const starshipResponse = {
    name: 'B',
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
    pilots: ['URL Pilot A', 'URL Pilot B'],
    films: ['URL Film A', 'URL Film B'],
    created: '',
    edited: '',
    url: 'URL Starship B',
} as IStarship;


describe('StarshipComponent', () => {
    let httpTestingController: HttpTestingController;
    let swapiService: SwapiService;
    let fixture: ComponentFixture<StarshipComponent>;
    let comp: StarshipComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [HttpClientTestingModule],
            providers: [NgbActiveModal],
        });
        // Inject the test controller, swapiServer (DI), and
        // component-under-test
        // as they will be referenced by each test.
        httpTestingController = TestBed.inject(HttpTestingController);
        swapiService = TestBed.inject(SwapiService);
        fixture = TestBed.createComponent(StarshipComponent);
        comp = fixture.componentInstance;

        comp.url = 'URL Starship B'; // $Imput
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
        spyOn(swapiService, 'getStarshipByUrl')
            .withArgs('URL Starship B')
            .and.returnValue(
                of(
                    new HttpResponse<IStarship>({ body: starshipResponse })
                ).pipe(
                    delay(1) // 1ms delay
                )
            );
        spyOn(swapiService, 'getPilotByUrl')
            .withArgs('URL Pilot A')
            .and.returnValue(
                of(
                    new HttpResponse<IPilot>({
                        body: { name: 'A', url: 'URL Pilot A' },
                    })
                )
            )
            .withArgs('URL Pilot B')
            .and.returnValue(
                of(
                    new HttpResponse<IPilot>({
                        body: { name: 'B', url: 'URL Pilot B' },
                    })
                )
            );
        spyOn(swapiService, 'getFilmByUrl')
            .withArgs('URL Film A')
            .and.returnValue(
                of(
                    new HttpResponse<IFilm>({
                        body: { title: 'A', url: 'URL Film A' },
                    })
                )
            )
            .withArgs('URL Film B')
            .and.returnValue(
                of(
                    new HttpResponse<IFilm>({
                        body: { title: 'B', url: 'URL Film B' },
                    })
                )
            );

        expect(comp.url)
            .withContext('@Input url property')
            .toEqual('URL Starship B');
        expect(comp.starship).withContext('starship property').toEqual(null);
        expect(comp.pilots).withContext('pilots property').toEqual([]);
        expect(comp.films).withContext('films property').toEqual([]);
        expect(comp.jpg).withContext('jpg property').toBe(comp.jpg);

        // Run getStarship(), but swapiService has a 1ms delay
        comp.ngOnInit();

        tick(1); // he 1ms delay ends. (fakeAsync)
        flush(); // Flushes all pending microtasks (fakeAsync)

        expect(comp.url)
            .withContext('@Input url property after loading data')
            .toEqual('URL Starship B');
        expect(comp.starship)
            .withContext('starship property after loading data')
            .toEqual(starshipResponse);
        expect(comp.pilots)
            .withContext('pilots property after loading data')
            .toEqual([
                { name: 'A', url: 'URL Pilot A' },
                { name: 'B', url: 'URL Pilot B' },
            ]);
        expect(comp.films)
            .withContext('films property after loading data')
            .toEqual([
                { title: 'A', url: 'URL Film A' },
                { title: 'B', url: 'URL Film B' },
            ]);
        expect(comp.jpg)
            .withContext('jpg property after loading data')
            .toBe(comp.jpg);
    }));

    it('isImage function', async () => {
        let err = null;
        let res = null;

        await comp.isImage("Perico").then(() => {
            fail;
        }).catch( parErr => {
            err = parErr
        });

        await comp.isImage('assets/img/space600x400.webp')
            .then((parRes) => {
                res = parRes
            })
            .catch(() => {
                fail;
            });

        expect(err).withContext('The image is not ok').not.toBeNull();
        expect(res).withContext('The image is OK').not.toBeNull();
    })
});
