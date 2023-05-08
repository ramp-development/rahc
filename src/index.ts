import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { components } from './components';
import { pages } from './pages';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('index');

  gsap.registerPlugin(ScrollTrigger);

  components();
  pages();
});
