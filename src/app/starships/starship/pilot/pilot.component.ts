import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPilot } from 'src/model/IPilot';

@Component({
    selector: "app-pilot",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./pilot.component.html",
    styles: [
        "p>span {color: #999; margin-left: 1rem}",
        "p {color: rgb(222, 226, 230); margin: 0}",
        "h5 {min-height: 3rem}"
    ],
})
export class PilotComponent {
    @Input() pilot!: IPilot;
}
