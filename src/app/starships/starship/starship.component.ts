import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IPilot } from "src/model/IPilot";
import { IStarship } from "src/model/IStarship";
import { SwapiService } from "src/services/swapi.service";
import { PilotComponent } from "./pilot/pilot.component";
import { NgFor } from "@angular/common";
import { FilmComponent } from "./film/film.component";
import { IFilm } from "src/model/IFilm";

@Component({
    selector: "app-starship",
    standalone: true,
    templateUrl: "./starship.component.html",
    imports: [PilotComponent, FilmComponent, NgFor],
    styles: [
        "img {width: 100%; max-width: 600px}",
        "p>span {color: #999; margin-left: .4rem}",
        "p {margin-top: 0; margin-bottom: 0}",
    ],
})
export class StarshipComponent implements OnInit {
    @Input() url: string = "";
    @HostBinding("class.pepe") public get classDark1() {
        return true;
    }
    @HostBinding("class.c1") get c1() {
        return true;
    }
    starship: IStarship | null = null;
    pilots: IPilot[] = [];
    films: IFilm[] = [];
    emptyJpg = "./assets/img/space600x400.webp";
    jpg = this.emptyJpg;
    jpgUrl = "https://starwars-visualguide.com/assets/img/starships/";
    isImage = (url: string) =>
        new Promise((resolve, reject) => {
            // check that is a valid url
            // then if valid url
            const image = new Image();
            image.src = url;
            image.onload = resolve;
            image.onerror = reject;
        });
    constructor(
        public activeModal: NgbActiveModal,
        private swapiService: SwapiService
    ) {}

    ngOnInit(): void {
        this.getStarship();
    }

    getStarship(): void {
        this.swapiService.getStarshipByUrl(this.url).subscribe(resp => {
            this.starship = resp.body;

            const arr = this.starship?.url.split("/") || [];
            let name = arr.pop();

            if (name == "") name = arr.pop();

            const url = this.jpgUrl + name + ".jpg";

            this.isImage(url)
                .then(() => (this.jpg = url))
                .catch(() => {});

            const pilots = this.starship?.pilots || [];

            pilots.forEach(v => {
                this.swapiService.getPilotByUrl(v).subscribe(resp => {
                    const pilot = resp.body || { url: v };
                    this.pilots.push(pilot);
                });
            });

            const films = this.starship?.films || [];

            films.forEach(v => {
                this.swapiService.getFilmByUrl(v).subscribe(resp => {
                    const film = resp.body || { url: v };
                    this.films.push(film);
                });
            });
        });
    }
}
