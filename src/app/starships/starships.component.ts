import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { SwapiService } from 'src/services/swapi.service';
import { HttpResponse } from '@angular/common/http';
import { IStarship } from 'src/model/IStarship';
import { ISwapiResp } from 'src/model/ISwapiResp';
import { StarshipComponent } from './starship/starship.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    standalone: true,
    imports: [NgFor],
    templateUrl: './starships.component.html',
    styleUrls: ['./starships.component.scss'],
})
export class StarshipsComponent implements OnInit {
    resp?: HttpResponse<ISwapiResp>;
    starships: IStarship[] = [];

    constructor(
        private swapiService: SwapiService,
        private modalService: NgbModal
    ) {
        this.getStarships();
    }

    ngOnInit(): void {
        this.getStarships();
    }

    getStarships(): void {
        this.swapiService.getStarships().subscribe((resp) => {
            console.log('RESP', resp);
            this.starships = resp.body ? resp.body.results : [];
            this.resp = resp;
        });
    }

    onClick(url: string) {
        const modalRef = this.modalService.open(StarshipComponent);
        modalRef.componentInstance.url = url;
    }
}
