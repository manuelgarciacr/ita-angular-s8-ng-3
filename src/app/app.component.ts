import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOptimizedImage } from '@angular/common';
import { LoginComponent } from './login/login.component';

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        NgbCollapseModule,
        NgOptimizedImage,
    ],
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "IT Academy Sprint 8";
    isMenuCollapsed = true;

    constructor(private modalService: NgbModal) {}

    openLogin() {
        const modalRef = this.modalService.open(LoginComponent, { fullscreen: true, windowClass: "login-modal" });
        modalRef.result
            .then(res => {
                console.log(res)
            })
            .catch(err => console.error(err));
    }
}
