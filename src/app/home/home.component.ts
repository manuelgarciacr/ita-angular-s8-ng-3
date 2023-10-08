import { Component, HostBinding, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ALongTime,
    StarWarsCrawl,
    StarWarsLogo,
    DarkSky,
    Planets,
    Crawl
} from '../route-animations';
import { AnimationEvent } from '@angular/animations';

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styles: [
        '.container {max-width: 1200px; height: calc(100vh - 220px); overflow: hidden;}',
        ".container>p {color: #1bc8f8; font-family: 'Open Sans', sans-serif; font-size: 3.75rem }",
        `
            .d3d {
                transform: perspective(340px) rotateX(40deg);
                margin: 0 auto;
            }
        `,
        `
            .d3d > div {
                position: relative;
            }
        `,
        `
            .d3d p {
                color: #cca927;
                font-family: 'Spline Sans Mono', monospace;
                font-size: 36px;
                margin: 0;
                position: relative;
            }
        `,
    ],

    animations: [
        ALongTime,
        StarWarsLogo,
        Crawl,
        StarWarsCrawl,
        DarkSky,
        Planets,
    ],
})
export class HomeComponent implements OnDestroy {
    @HostBinding('@.disabled') public animationsDisabled = false;

    protected audio: HTMLAudioElement;
    animationState = 'none';
    starWarsLogoState = 'none';
    animating = false;
    destroying = false;

    constructor() {
        this.audio = new Audio(
            '../../assets/audio/StarWarsThemeSongByJohnWilliams.mp3'
        );
        this.audio.muted = false;
    }

    ngOnDestroy(): void {
        this.destroying = true;
        this.audio.pause();
        this.audio.remove();
    }

    animate() {
        if (this.animating) {
            this.audio.muted = !this.audio.muted;
            return;
        }

        this.animating = true;
        this.animationState = 'closed';
        this.starWarsLogoState = 'closed';

        setTimeout(() => {
            this.animationState = 'open';
        }, 1);

        setTimeout(() => (this.starWarsLogoState = 'open'), 7200);
    }

    animationEvent(event: AnimationEvent) {
        console.log(event);
        if (event['triggerName'] == 'starWarsLogo') {
            if (event['fromState'] == 'closed' && !this.destroying) {
                this.audio.load();
                this.audio.play();
            }
        }
        if (event['triggerName'] == 'aLongTime') {
            if (event['fromState'] == 'closed') {
                if (event['phaseName'] == 'done') {
                    this.animating = false;
                }
            }
        }
    }
}

