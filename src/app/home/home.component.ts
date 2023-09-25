import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ALongTime,
    StarWarsCrawl,
    StarWarsLogo,
} from '../route-animations';
import { AnimationEvent } from '@angular/animations';

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styles: [
        '.container {max-width: 1200px; height: calc(100vh - 175px); overflow: hidden;}',
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

    animations: [ALongTime, StarWarsLogo, StarWarsCrawl],
})
export class HomeComponent implements OnInit, OnDestroy {
    @HostBinding('@.disabled') public animationsDisabled = false;
    aLongTimeState = 'closed';
    starWarsLogoState = 'closed';
    private audio: HTMLAudioElement;
    audioOn: boolean | null = null;

    constructor() {
        this.audio = new Audio(
            '../../assets/audio/StarWarsThemeSongByJohnWilliams.mp3'
        );
        this.audio.muted = false;
    }

    ngOnInit(): void {
        setTimeout(() => (this.starWarsLogoState = 'open'), 7200);
        this.checkAudio().then((res) => (this.audioOn = res));
    }

    ngOnDestroy(): void {
        this.audio.load();
    }

    async checkAudio(): Promise<boolean | null> {
        if (!this.audio.paused) return !this.audio.muted;

        this.audio.volume = 0;
        return this.audio
            .play()
            .then(() => {
                this.audio.load();
                return !this.audio.muted;
            })
            .catch((err) => {
                console.log('checkAudio error:', err);
                return null;
            })
            .finally(() => {
                this.audio.volume = 1;
            });
    }

    setAudio() {
        if (this.audioOn == null) {
            window.location.reload();
        } else if (this.audioOn) {
            this.audio.muted = true;
            this.audioOn = false;
        } else {
            this.audio.muted = false;
            this.audioOn = true;
        }
    }

    playAudio(event: AnimationEvent) {
        if (event['triggerName'] == 'starWarsLogo') {
            if (event['fromState'] == 'closed') {
                this.audio.load();
                this.audio.play();
            }
        }
    }
}
