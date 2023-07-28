import { Splide } from '@splidejs/splide';

export const media = () => {
  const videoSplide = document.querySelector<HTMLElement>('[data-splide-name="video"]');
  const thumbnailSplide = document.querySelector<HTMLElement>('[data-splide-name="thumbnails"]');
  if (!videoSplide || !thumbnailSplide) return;

  const videoSlider = new Splide(videoSplide, {
    perPage: 1,
    type: 'loop',
    arrows: false,
    pagination: false,
  });

  const thumbnailSlider = new Splide(thumbnailSplide, {
    perPage: 4,
    gap: '2.375em',
    type: 'loop',
    rewind: true,
    // focus: 'center',
    // trimSpace: false,
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

  //   videoSlider.sync(thumbnailSlider);
  videoSlider.mount();
  thumbnailSlider.mount();

  const videoSlides = videoSlider.Components.Elements.slides;
  function videoActive(slug: string): void {
    const slide = videoSlides.find((slide) => slide.dataset.splideSlide === slug);
    const index = videoSlides.indexOf(slide);

    videoSlider.go(`>${index}`);
  }

  const firstSlide = thumbnailSlider.Components.Elements.slides[0];
  const thumbnailSlides = thumbnailSlider.Components.Slides.get(false);
  thumbnailSlides.forEach((slide) => {
    const { splideSlide } = slide.slide.dataset;
    if (splideSlide === firstSlide.dataset.splideSlide) {
      slide.slide.classList.add('is-selected');
    }

    slide.slide.addEventListener('click', () => {
      thumbnailSlides.forEach((slide) => {
        if (slide.slide.dataset.splideSlide === splideSlide) {
          slide.slide.classList.add('is-selected');
        } else {
          slide.slide.classList.remove('is-selected');
        }
      });

      videoActive(splideSlide);
    });
  });

  thumbnailSlider.Components.Elements.arrows.style.height = `${
    thumbnailSlider.Components.Elements.slides[0].querySelector('.aspect_wrapper').offsetHeight
  }px`;
};
