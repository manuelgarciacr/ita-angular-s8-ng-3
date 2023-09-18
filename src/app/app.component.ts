import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterModule, // Adds directives and providers for in-app navigation among views
        CommonModule, RouterOutlet, NgbCollapseModule, NgbNavModule, RouterLink],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'IT Academy Sprint 8';
    isMenuCollapsed = true;
}
