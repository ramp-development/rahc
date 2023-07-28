import { Splide } from '@splidejs/splide';

export const media = () => {
  const videoSplide = document.querySelector<HTMLElement>('[data-splide-name="video"]');
  const thumbnailSplide = document.querySelector<HTMLElement>('[data-splide-name="thumbnails"]');
  if (!videoSplide || !thumbnailSplide) return;

  const videoSlider = new Splide(videoSplide, {
    perPage: 1,
    // type: '',
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

  class VideoSlide {
    public slide: HTMLElement;
    public id: string;
    public index: number;
    public embed: HTMLIFrameElement;
    private src: string;

    constructor(slide: HTMLElement, index: number) {
      this.slide = slide;
      this.id = slide.dataset.splideSlide;
      this.index = index;
      this.embed = slide.querySelector('iframe');
      this.src = this.embed.src;
    }

    pause(): void {
      this.embed.src = '';
    }

    makeActive(): void {
      videoSlider.go(this.index);
      this.embed.src = this.src;
    }
  }

  const videoSlides = videoSlider.Components.Elements.slides.map((slide, index) => {
    return new VideoSlide(slide, index);
  });

  console.log(videoSlides);

  function videoActive(slug: string): void {
    videoSlides.forEach((slide) => slide.pause());
    const slide = videoSlides.find((slide) => slide.id === slug);
    slide.makeActive();
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
