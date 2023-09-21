import { Component, Input, OnInit } from "@angular/core";
//import { CommonModule } from '@angular/common';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IStarship } from "src/model/IStarship";
import { SwapiService } from "src/services/swapi.service";
//import { NgOptimizedImage } from "@angular/common";

@Component({
    selector: "app-starship",
    standalone: true,
    //imports: [CommonModule],
    //imports: [NgOptimizedImage],
    templateUrl: "./starship.component.html",
    styles: [
        "img {width: 100%; max-width: 600px}",
        "span {color: #999; margin-left: .4rem}",
        "p {margin-top: 0; margin-bottom: 0}",
    ],
})
export class StarshipComponent implements OnInit {
    @Input() url: string = "";
    starship: IStarship | null = null;
    emptyJpg = "./assets/img/space600x400.webp";
    jpg = "";
    jpgUrl = "https://starwars-visualguide.com/assets/img/starships/";

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

            this.jpg = this.jpgUrl + name + ".jpg";
            this.starship = resp.body;
        });
    }

    imageError() {
        this.jpg = this.emptyJpg
    }
}
