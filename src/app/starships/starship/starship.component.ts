import { Component, Input, OnInit } from "@angular/core";
//import { CommonModule } from '@angular/common';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IStarship } from "src/model/IStarship";
import { SwapiService } from "src/services/swapi.service";
import { NgOptimizedImage } from "@angular/common";

@Component({
    selector: "app-starship",
    standalone: true,
    //imports: [CommonModule],
    //imports: [NgOptimizedImage],
    templateUrl: "./starship.component.html",
    styles: [
        "img {width: 100%}",
        "span {color: #999; margin-left: .4rem}",
        "p {margin-top: 0; margin-bottom: 0}"],
})
export class StarshipComponent implements OnInit {
    @Input() url: string = "";
    starship: IStarship | null = null;
    jpg = "";

    constructor(
        public activeModal: NgbActiveModal,
        private swapiService: SwapiService
    ) {}

    ngOnInit(): void {
        this.getStarship();
    }

    getStarship(): void {
        this.swapiService.getStarshipByUrl(this.url).subscribe(resp => {
            const arr = this.url.split("/");
            let name = arr.pop();
            if (name == "")
                name = arr.pop();
            console.log("RESP", this.url, "*", arr, "*", name)
            this.starship = resp.body;
        });
    }
}
