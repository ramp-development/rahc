import { gsap, ScrollTrigger } from 'gsap';

export const initNav = (nav: HTMLDivElement): void => {
  const navBackground = nav.querySelector('.nav_background');

  const mm = gsap.matchMedia();
  mm.add('(min-width: 992px)', () => {
    const timeline: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        end: `+=${nav.offsetHeight}`,
        scrub: 1,
      },
    });

    timeline.to(navBackground, { height: '100%' });
  });
};
