import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { NgbCollapseModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOptimizedImage } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UsersService } from 'src/services/users.service';
import { IUser } from 'src/model/IUser';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        NgbCollapseModule,
        NgOptimizedImage,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'IT Academy Sprint 8';
    isMenuCollapsed = true;
    protected user!: IUser | null;
    private subs: Subscription = this.usersService
        .getUser()
        .subscribe((user) => {
            this.user = user;
        });

    constructor(
        private modalService: NgbModal,
        private usersService: UsersService,
        private router: Router
    ) {}

    openLogin() {
        const modalRef = this.modalService.open(LoginComponent, {
            fullscreen: true,
            windowClass: 'login-modal',
        });
        modalRef.result
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.error(err));
    }

    logout() {
        this.usersService.logout();
        if (this.router.url == "/starships")
            this.router.navigate(["/"]);
    }
}
