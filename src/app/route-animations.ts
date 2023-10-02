import {
    trigger,
    transition,
    style,
    query,
    //group,
    //animateChild,
    animate,
    //keyframes,
    //stagger,
    animateChild,
    sequence,
    //AnimationStyleMetadata,
    state,
} from '@angular/animations';
//const OPTIONAL = { optional: true };

export const homeAnimation = trigger('homeTrigger', [
    transition('* => isHome', [query(':enter', [query('@*', animateChild())])]),
]);

export const ALongTime = [
    trigger('aLongTime', [
        state(
            'closed',
            //enforce your styles for closed state here
            style({ display: 'none' })
        ),
        state('open', style({ display: 'block', width: '75%' })),
        transition('closed => open', [
            query(':self', [
                style({ opacity: 0, width: '0px' }),
                sequence([
                    // 7000ms
                    animate('1ms 1000ms', style({ opacity: 0, width: '75%' })),
                    style({ display: 'block' }),
                    animate('2000ms 0ms ease', style({ opacity: 1 })),
                    animate('2000ms 2000ms ease', style({ opacity: 0 })),
                    style({ display: 'none' }),
                    // Last animation:  Delay 86000ms + 2000ms
                    animate('1ms 86000ms', style({ opacity: 0, width: '75%' })),
                    style({ display: 'block' }),
                    animate('2000ms 0ms ease', style({ opacity: 1 })),
                    //style({ display: 'block' }),
                ]),
            ]),
        ]),
    ]),
];

export const StarWarsLogo = [
    trigger('starWarsLogo', [
        state(
            'closed',
            //enforce your styles for closed state here
            style({ display: 'none' })
        ),
        state('open', style({ display: 'none' })),
        transition('closed => open', [
            query(':self', [
                style({ transform: 'scale(100%)', display: 'block' }),
                sequence([
                    // Programatically timeout of 7200ms + 12000ms
                    animate('12000ms ease', style({ transform: 'scale(0%)' })),
                ]),
            ]),
        ]),
    ]),
];

export const StarWarsCrawl = [
    trigger('starWarsCrawl', [
        state(
            'closed',
            //enforce your styles for closed state here
            style({ display: 'none' })
        ),
        transition(':enter', [
            query(':self', [
                style({ top: 'calc(54px * 16)' }),
                sequence([
                    // Delay 18000ms + 68000ms
                    animate('1ms 18000ms', style({})), // 11000 to 18000
                    style({ display: 'block' }),
                    animate(
                        '68000ms 0ms', // 40000 to 68000
                        style({ top: 'calc(54px * -32)', display: '' }) // -24 to -32
                    ),
                    style({ display: 'none' }),
                ]),
            ]),
        ]),
    ]),
];

export const DarkSky = [
    trigger('darkSky', [
        state(
            'closed',
            //enforce your styles for closed state here
            style({ opacity: 0 })
        ),
        state('open', style({ opacity: .5 })),
        state('end', style({ opacity: 1 })),
        transition('closed => open', [
            query(':self', [
                sequence([
                    // Delay 86000ms + 2000ms
                    animate('1ms 60000ms', style({})),
                    animate('20000ms 0ms ease', style({ opacity: .5 })),
                ]),
            ]),
        ]),
    ]),
];

export const Planets = [
    trigger('planets', [
        state(
            'closed',
            //enforce your styles for closed state here
            style({ transform: 'translateY(100%)' })
        ),
        state('open', style({ transform: 'translateY(0%)' })),
        transition('closed => open', [
            query(':self', [
                sequence([
                    // Delay 86000ms + 2000ms
                    animate('1ms 65000ms', style({})),
                    animate(
                        '20000ms 0ms ease',
                        style({ transform: 'translateY(0%)' })
                    ),
                ]),
            ]),
        ]),
    ]),
];

