import { simulateEvent } from '@finsweet/ts-utils';
import { file } from 'jszip';

export const download = () => {
  console.log('download');

  // get reference to elements
  const toolkitForm = document.querySelector<HTMLFormElement>('.toolkit_form');
  const toolkitBody = document.querySelector<HTMLDivElement>('[data-folder-body]');
  const inputs = toolkitBody?.querySelectorAll<HTMLInputElement>('input');
  const downloadTriggers = [...document.querySelectorAll<HTMLAnchorElement>('[data-download]')];
  const downloadPreviewTrigger = document.querySelector<HTMLDivElement>(
    '[data-download-modal="preview"]'
  );
  const downloadModalTrigger = document.querySelector<HTMLDivElement>(
    '[data-download-modal="form"]'
  );

  if (
    !toolkitForm ||
    !toolkitBody ||
    inputs?.length === 0 ||
    downloadTriggers.length === 0 ||
    !downloadPreviewTrigger ||
    !downloadModalTrigger
  )
    return;

  let fileURLs: string[] | null = null;
  // download triggers
  downloadTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      // get the download type and assign the file urls
      const downloadType = trigger.dataset.download;
      if (downloadType === 'selected') {
        const checkedInputs = [...inputs].filter((input) => input.checked);
        fileURLs = checkedInputs.map(
          (input) => input.parentElement?.querySelector('[data-download=asset]')?.href
        );
      } else {
        fileURLs = [trigger.href];
      }

      // run download flow
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
    if (!fileURLs || fileURLs.length === 0) return;
    if (!Array.isArray(fileURLs)) fileURLs = [fileURLs];

    fileURLs.forEach((url) => {
      window.open(url, '_blank', 'popup');
    });
  }

  // listen for form submission
  toolkitForm?.addEventListener('submit', (event) => {
    // save to local storage
    localStorage.setItem('toolkitFormSubmitted', 'true');

    // download assets
    downloadAssets();
  });
};
