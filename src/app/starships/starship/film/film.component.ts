import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFilm } from 'src/model/IFilm';

@Component({
    selector: "app-film",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./film.component.html",
    styles: [
        "p>span {color: #999; margin-left: 1rem; overflow: hidden; white-space: nowrap;}",
        `
            p.cls-crawl > span {
                margin-left: 0;
                height: 6rem;
                display: block;
                white-space: break-spaces;
                word-break: break-word;
            }
        `,
        `
            p.cls-name > span {
                margin-left: 0;
                height: 3rem;
                display: block;
                white-space: break-spaces;
                word-break: break-word;
            }
        `,
        "p {color: rgb(222, 226, 230); margin: 0}",
        "h5 {min-height: 3rem}",
    ],
})
export class FilmComponent {
    @Input() film!: IFilm;
}
