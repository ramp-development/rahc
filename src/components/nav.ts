import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initNav = (nav) => {
  const navBackground = nav.querySelector('.nav_background');

  const timeline = gsap.timeline({
    scrollTrigger: {
      start: 'top top',
      end: `+=${nav.offsetHeight}`,
      scrub: 1,
    },
  });

  timeline.to(navBackground, { height: '100%' });
};
