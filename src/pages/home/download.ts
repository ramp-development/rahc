import { simulateEvent } from '@finsweet/ts-utils';

export const download = () => {
  console.log('download');

  // get reference to elements
  const toolkitForm = document.querySelector<HTMLFormElement>('.toolkit_form');
  const downloadTriggers = [...document.querySelectorAll<HTMLAnchorElement>('[data-download]')];
  const downloadPreviewTrigger = document.querySelector<HTMLDivElement>(
    '[data-download-modal="preview"]'
  );
  const downloadModalTrigger = document.querySelector<HTMLDivElement>(
    '[data-download-modal="form"]'
  );

  if (
    !toolkitForm ||
    downloadTriggers.length === 0 ||
    !downloadPreviewTrigger ||
    !downloadModalTrigger
  )
    return;

  let fileURL: string | null = null;
  // download triggers
  downloadTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      fileURL = trigger.href;
      downloadAssetsFlow();
    });
  });

  // download flow
  function downloadAssetsFlow(): void {
    // check if the form has been submitted
    const hasSubmitted = localStorage.getItem('toolkitFormSubmitted');

    // download the assets if it has
    if (hasSubmitted) {
      downloadAssets();
      return;
    }

    // open the form if not
    simulateEvent(downloadModalTrigger, 'click');
  }

  function downloadAssets() {
    if (!fileURL) return;
    window.open(fileURL, '_blank');
  }

  // listen for form submission
  toolkitForm?.addEventListener('submit', (event) => {
    // save to local storage
    localStorage.setItem('toolkitFormSubmitted', 'true');

    // download assets
    downloadAssets();
  });
};
