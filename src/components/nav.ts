import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initNav = (nav: HTMLDivElement) => {
  const navBackground = nav.querySelector('.nav_background');

  const mm = gsap.matchMedia();
  mm.add('(min-width: 992px)', () => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        end: `+=${nav.offsetHeight}`,
        scrub: 1,
      },
    });

    timeline.to(navBackground, { height: '100%' });
  });
};
