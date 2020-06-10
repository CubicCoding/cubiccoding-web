import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

export const fader = trigger('fade', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate(350, style({ opacity: 1 }))
  ])
]);

export const slider =
  trigger('routeAnimations', [
    transition('signin => voucher', slideTo('right')),
    transition('voucher => signup', slideTo('right')),
    transition('signup => voucher', slideTo('left')),
    transition('voucher => signin', slideTo('left')),
    transition('signin => contact', slideTo('right')),
    transition('contact => signin', slideTo('left'))
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%' })
    ]),
    group([
      query(':leave', [
        animate('500ms ease', style({ [direction]: '100%' }))
      ], optional),
      query(':enter', [
        animate('500ms ease', style({ [direction]: '0%' }))
      ])
    ])
  ];
}
