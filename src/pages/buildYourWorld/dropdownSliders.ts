import { Splide } from '@splidejs/splide';

export const dropdownSliders = () => {
  const dropdownSliders = [...document.querySelectorAll<HTMLElement>('.splide.slider1')];
  dropdownSliders.forEach((slider) => {
    new Splide(slider, {
      // Desktop on down
      perPage: 1,
      perMove: 1,
      focus: 0, // 0 = left and 'center' = center
      type: 'slide', // 'loop' or 'slide'
      gap: '0px', // space between slides
      //   arrows: 'slider', // 'slider' or false
      pagination: false, // 'slider' or false
      speed: 600, // transition speed in miliseconds
      dragAngleThreshold: 60, // default is 30
      autoWidth: false, // for cards with differing widths
      rewind: false, // go back to beginning when reach end
      rewindSpeed: 400,
      waitForTransition: false,
      updateOnMove: true,
      trimSpace: false, // true removes empty space from end of list
      breakpoints: {
        991: {
          // Tablet
          perPage: 1,
          gap: '0px',
        },
        767: {
          // Mobile Landscape
          perPage: 1,
          gap: '0px',
        },
        479: {
          // Mobile Portrait
          perPage: 1,
          gap: '0px',
        },
      },
    }).mount();
  });
};
