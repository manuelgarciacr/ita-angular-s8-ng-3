import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, ChildrenOutletContexts, Router } from '@angular/router';
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
        private contexts: ChildrenOutletContexts,
        private modalService: NgbModal,
        private usersService: UsersService,
        private router: Router
    ) {
        // this.usersService.signup({
        //     email: "manuel.garcia.cr@hotmail.com",
        //     firstName: "Manuel",
        //     lastName: "García Criado",
        //     password: "Anita@001",
        //     mailing: true
        // }).then(res => {
        //     if (res != "login")
        //         return true;

        //     return this.usersService.login("manuel.garcia.cr@hotmail.com",
        //         "Anita@001")
        // }).then(() => {
        //     console.log(this.router.url);
        //     if (this.router.url == "/")
        //         this.router.navigate(["starships"]);
        // })
    }

    getRouteAnimationData(outlet: RouterOutlet) {
        // We can have more than one outlet. Getting the primary or named outlet.
        // return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
        //     'animation'
        // ];

        // We can get the outlet by parm
        return outlet?.activatedRouteData?.['animation'];
    }

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
