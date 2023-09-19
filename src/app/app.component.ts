import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgOptimizedImage } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SwapiService } from 'src/services/swapi.service';
import { IStarship } from 'src/model/IStarship';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule, // Adds directives and providers for in-app navigation among views
        RouterOutlet,
        RouterLink,
        NgbCollapseModule,
        NgbNavModule,
        NgOptimizedImage,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'IT Academy Sprint 8';
    isMenuCollapsed = true;
    url = 'https://swapi.dev/api';
    resp: Observable<HttpResponse<IStarship[]>>;

    constructor(private http: HttpClient, private swapiService: SwapiService) {
        this.resp = this.swapiService.getStarships()
    }

    ngOnInit(): void {
        this.resp.subscribe(data => console.log(data))
    }
}
