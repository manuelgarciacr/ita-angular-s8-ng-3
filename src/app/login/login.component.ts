import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./login.component.html",
    styles: [
        ".close-btn svg { width: 1.4em; height: 1.4em}"
    ],
})
export class LoginComponent {
    constructor(public activeModal: NgbActiveModal) {}
}
