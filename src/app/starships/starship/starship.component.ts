import { Component, Input } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-starship',
    standalone: true,
    //imports: [CommonModule],
    templateUrl: './starship.component.html',
    styleUrls: ['./starship.component.scss'],
})
export class StarshipComponent {
    @Input() url: string = "";

    constructor(public activeModal: NgbActiveModal) {}
}
