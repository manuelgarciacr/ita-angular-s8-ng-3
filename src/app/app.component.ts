import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, ChildrenOutletContexts } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgOptimizedImage } from '@angular/common';
import { homeAnimation } from './route-animations';

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
    animations: [homeAnimation],
})
export class AppComponent {
    title = 'IT Academy Sprint 8';
    isMenuCollapsed = true;

    constructor(private contexts: ChildrenOutletContexts) {}

    getRouteAnimationData(outlet: RouterOutlet) {
        // We can have more than one outlet. Getting the primary or named outlet.
        // return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
        //     'animation'
        // ];

        // We can get the outlet by parm
        return outlet?.activatedRouteData?.['animation'];
    }
}
