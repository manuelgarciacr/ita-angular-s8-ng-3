import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IStarship } from "src/model/IStarship";
import { SwapiService } from "src/services/swapi.service";

@Component({
    selector: "app-starship",
    standalone: true,
    templateUrl: "./starship.component.html",
    styles: [
        "img {width: 100%; max-width: 600px}",
        "span {color: #999; margin-left: .4rem}",
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
            this.starship = resp.body;
        });
    }
}
