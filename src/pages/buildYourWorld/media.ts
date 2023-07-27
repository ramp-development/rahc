import { Splide } from '@splidejs/splide';

export const media = () => {
  const videoSplide = document.querySelector<HTMLElement>('[data-splide-name="video"]');
  const thumbnailSplide = document.querySelector<HTMLElement>('[data-splide-name="thumbnails"]');
  if (!videoSplide || !thumbnailSplide) return;

  const videoSlider = new Splide(videoSplide, {
    perPage: 1,
    arrows: false,
    pagination: false,
  });

  const thumbnailSlider = new Splide(thumbnailSplide, {
    perPage: 4,
    gap: '2.375em',
    type: 'loop',
    rewind: true,
    isNavigation: true,
    pagination: false,
    breakpoints: {
      991: {
        perPage: 3,
      },
      767: {
        perPage: 2,
      },
    },
  });

  videoSlider.sync(thumbnailSlider);
  videoSlider.mount();
  thumbnailSlider.mount();

  thumbnailSlider.Components.Elements.arrows.style.height = `${
    thumbnailSlider.Components.Elements.slides[0].querySelector('.video-slider_video').offsetHeight
  }px`;
};
