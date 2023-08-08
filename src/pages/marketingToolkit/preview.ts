import { simulateEvent } from '@finsweet/ts-utils';
import Splide from '@splidejs/splide';

export const preview = () => {
  // element selectors
  const previewModalTriggerSelector = '[data-download-modal="preview"]',
    previewTriggerSelector = '[data-preview]',
    previewLinkSelector = '[data-preview="asset"]',
    splideSelector = '.splide';

  // global elements
  const previewModalTrigger = document.querySelector<HTMLDivElement>(previewModalTriggerSelector),
    previewTriggers = [...document.querySelectorAll<HTMLDivElement>(previewTriggerSelector)],
    previewLinks = [...document.querySelectorAll<HTMLAnchorElement>(previewLinkSelector)];

  if (!previewModalTrigger || previewTriggers.length === 0 || previewLinks.length === 0) return;

  // splide options
  const splideOptions = {
    pagination: false,
    perPage: 1,
    perMove: 1,
  };

  // prep preview slider
  const splide = new Splide(splideSelector, splideOptions).mount();
  previewTriggers.forEach((trigger) => setupPreview(trigger));

  // setup preview
  function setupPreview(trigger: HTMLDivElement) {
    const type = trigger.dataset.preview;

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      let assetLink = trigger;

      if (type === 'folder') {
        const parent = trigger.closest<HTMLDivElement>('[data-folder-level]');
        assetLink = parent?.querySelector<HTMLAnchorElement>(previewLinkSelector);
      }

      const index = previewLinks.findIndex((link) => link.href === assetLink.href);
      simulateEvent(previewModalTrigger, 'click');

      setTimeout(() => {
        splide.go(index);
      }, 10);
    });
  }
};
