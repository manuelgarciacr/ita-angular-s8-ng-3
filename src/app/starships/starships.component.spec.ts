import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipsComponent } from './starships.component';
import { SwapiService } from 'src/services/swapi.service';

class MockSwapiService {
    url = 'https://swapi.dev/api';
}

describe('StarshipsComponent', () => {
    let component: StarshipsComponent;
    let fixture: ComponentFixture<StarshipsComponent>;
    let swapiService: SwapiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StarshipsComponent],
            providers: [{ provide: SwapiService, useClass: MockSwapiService }],
        });
        fixture = TestBed.createComponent(StarshipsComponent);
        component = fixture.componentInstance;
        swapiService = TestBed.inject(SwapiService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
