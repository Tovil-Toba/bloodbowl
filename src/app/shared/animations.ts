import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const themeChangeAnimation = trigger('pageAnimations', [
  // transition(':enter', []),
  transition('* => *', [
    query('.animation', [
      style({opacity: 0, transform: 'translateY(-100px)'}),
      stagger(-30, [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ])
]);

export const enterPageAnimation = trigger('pageAnimations', [
  transition(':enter', [
    query('.animation', [
      style({opacity: 0, transform: 'translateY(-30px)'}),
      stagger(-30, [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ])
]);
