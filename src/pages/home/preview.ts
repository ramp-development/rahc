import { simulateEvent } from '@finsweet/ts-utils';
import Splide from '@splidejs/splide';

export const preview = () => {
  console.log('preview');

  // get reference to elements
  const previewModalTrigger = document.querySelector<HTMLDivElement>(
    '[data-download-modal="preview"]'
  );
  const previewTriggers = [
    ...document.querySelectorAll<HTMLDivElement>('[data-preview="folder"], [data-preview="asset"]'),
  ];
  const previewLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-preview="asset"]')];
  if (!previewModalTrigger || previewTriggers.length === 0 || previewLinks.length === 0) return;

  // prep preview slider
  const splide = new Splide('.splide', {
    pagination: false,
    perPage: 1,
    perMove: 1,
  }).mount();

  previewTriggers.forEach((trigger) => {
    const type = trigger.dataset.preview;

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      let assetLink = trigger;

      if (type === 'folder') {
        const parent = trigger.closest<HTMLDivElement>('[data-folder-level]');
        assetLink = parent?.querySelector<HTMLAnchorElement>('[data-preview="asset"]');
      }

      const index = previewLinks.findIndex((link) => {
        return link.href === assetLink.href;
      });

      simulateEvent(previewModalTrigger, 'click');
      setTimeout(() => {
        splide.go(index);
      }, 10);
    });
  });
};
