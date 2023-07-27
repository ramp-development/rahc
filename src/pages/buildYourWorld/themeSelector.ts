import { Splide } from '@splidejs/splide';

import { FilterItem } from './filters';

export const themeSelector = () => {
  const selector = new Splide('[data-splide-name="selector"]', {
    direction: 'ttb',
    height: '100%',
    perPage: 1,
    perMove: 1,
    pagination: false,
  }).mount();

  const filterItems = [...document.querySelectorAll<HTMLDivElement>('[data-themes]')].map(
    (element) => new FilterItem(element as HTMLElement)
  );

  const initialSlideIndex = selector.index;
  const initialSlide = selector.Components.Elements.slides[initialSlideIndex];
  const initialTheme = initialSlide.textContent;
  if (!initialTheme) return;

  filterItems.forEach((item) => item.themeVisibility(initialTheme));

  selector.on('active', (e) => {
    const theme = e.slide.textContent;
    if (!theme) return;
    filterItems.forEach((item) => item.themeVisibility(theme));
  });
};
