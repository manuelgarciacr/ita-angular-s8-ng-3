import { Component, HostListener, OnInit } from "@angular/core";
import { NgFor, NgClass, NgIf } from "@angular/common";
import { SwapiService } from "src/services/swapi.service";
import { IStarship } from "src/model/IStarship";
import { StarshipComponent } from "./starship/starship.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {InfiniteScrollModule} from "ngx-infinite-scroll"

const showScrollHeight = 400;
const hideScrollHeight = 200;

@Component({
    standalone: true,
    imports: [NgFor, NgIf, NgClass, InfiniteScrollModule],
    templateUrl: "./starships.component.html",
    styles: [
        `
            .no-hidden {
                position: fixed;
                bottom: 10px;
                right: 10px;
                visibility: visible;
            }
        `,
    ],
})
export class StarshipsComponent implements OnInit {
    private nextPage: string | null = null;
    starships: IStarship[] = [];
    showGoUpButton = false;
    loading = false;

    constructor(
        private swapiService: SwapiService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.getStarships();
    }

    getStarships(): void {
        this.loading = true;
        this.swapiService.getStarshipsByUrl(this.nextPage).subscribe(resp => {
            this.starships.push(...(resp.body ? resp.body.results : []));
            this.nextPage = resp.body?.next || null;
            this.loading = false
        });
    }

    onClick(url: string) {
        const modalRef = this.modalService.open(StarshipComponent);
        modalRef.componentInstance.url = url;
    }

    onScroll() {
        if (this.nextPage) this.getStarships();
        else console.log("No more pages!");
    }

    scrollTop() {
        document.body.scrollTop = 0; // Safari
        document.documentElement.scrollTop = 0; // Other
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (
            (window.scrollY ||
                document.documentElement.scrollTop ||
                document.body.scrollTop) > showScrollHeight
        ) {
            this.showGoUpButton = true;
        } else if (
            this.showGoUpButton &&
            (window.scrollY ||
                document.documentElement.scrollTop ||
                document.body.scrollTop) < hideScrollHeight
        ) {
            this.showGoUpButton = false;
        }
    }
}
