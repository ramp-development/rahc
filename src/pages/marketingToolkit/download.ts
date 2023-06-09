import { simulateEvent } from '@finsweet/ts-utils';
import axios from 'axios';
import JSZip from 'jszip';

export const download = () => {
  console.log('download');

  // element selectors
  const downloadFormSelector = '[data-download-form]',
    assetFormSelector = '[data-asset-form]',
    toolkitBodySelector = '[data-folder-body]',
    downloadSelectedTriggerSelector = '[data-download="selected"]',
    downloadTriggerSelector = '[data-download]',
    downloadModalTriggerSelector = '[data-download-modal="form"]',
    downloadModalCloseSelector = '[data-download-modal="close"]';

  // global elements
  const downloadForm = document.querySelector<HTMLFormElement>(downloadFormSelector),
    assetForm = document.querySelector<HTMLFormElement>(assetFormSelector),
    toolkitBody = document.querySelector<HTMLDivElement>(toolkitBodySelector),
    downloadSelectedTrigger = document.querySelector<HTMLDivElement>(
      downloadSelectedTriggerSelector
    ),
    downloadTriggers = [...document.querySelectorAll<HTMLAnchorElement>(downloadTriggerSelector)],
    inputs = toolkitBody?.querySelectorAll<HTMLInputElement>('input');

  if (
    !downloadForm ||
    !assetForm ||
    !toolkitBody ||
    !downloadSelectedTrigger ||
    !downloadTriggers ||
    downloadTriggers.length === 0 ||
    !inputs ||
    inputs?.length === 0
  )
    return;

  // file config
  interface FileConfig {
    triggerType: 'all' | 'selected' | 'folder' | 'asset' | null;
    urls: string[];
  }

  const fileConfig: FileConfig = {
    triggerType: null,
    urls: [],
  };

  toggleDownloadSelectedButton();
  inputs.forEach((input) => handleInputChange(input));

  // handle input change
  function handleInputChange(input: HTMLInputElement) {
    input.addEventListener('change', () => {
      toggleInputActiveState(input);
      toggleDownloadSelectedButton();
    });
  }

  // toggle input states
  function toggleInputActiveState(input: HTMLInputElement) {
    const icon = input.parentElement?.querySelector<HTMLDivElement>('.toolkit-assets_icon');
    if (!icon) return;

    if (input.checked) {
      icon.style.display = 'block';
    } else {
      icon.style.removeProperty('display');
    }
  }

  // toggle download selected button
  function toggleDownloadSelectedButton() {
    if (!inputs || inputs.length === 0 || !downloadSelectedTrigger) return;

    const checkedInputs = [...inputs].filter((input) => input.checked);
    if (checkedInputs.length > 0) {
      downloadSelectedTrigger.style.removeProperty('display');
    } else {
      downloadSelectedTrigger.style.display = 'none';
    }
  }

  // run trigger click handler
  downloadTriggers.forEach(handleTriggerClick);

  // form submit handler
  downloadForm.addEventListener('submit', () => {
    localStorage.setItem('downloadFormSubmitted', 'true');
    downloadAssets();

    setTimeout(() => {
      downloadForm.reset();
      simulateEvent(document.querySelector<HTMLDivElement>(downloadModalCloseSelector)!, 'click');
    }, 10);
  });

  // asset form submit handler
  assetForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  // trigger click handler
  function handleTriggerClick(trigger: HTMLAnchorElement) {
    trigger.addEventListener('click', (event) => {
      console.log('trigger');
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const downloadType = trigger.dataset.download;
      fileConfig.triggerType = downloadType as FileConfig['triggerType'];
      fileConfig.urls = getFileURLs(downloadType, trigger) as FileConfig['urls'];
      downloadAssetsFlow();
    });
  }

  // download flow
  function downloadAssetsFlow() {
    const hasSubmitted = localStorage.getItem('downloadFormSubmitted');
    if (hasSubmitted) {
      downloadAssets();
    } else {
      simulateEvent(document.querySelector<HTMLDivElement>(downloadModalTriggerSelector), 'click');
    }
  }

  // download assets
  function downloadAssets() {
    if (fileConfig.urls.length === 0) return;
    let fileName = 'rahc-assets';
    switch (fileConfig.triggerType) {
      case 'all':
        fileName = 'all_rahc-assets';
        break;
      case 'selected':
        fileName = 'selected_rahc-assets';
        break;
      case 'folder':
        fileName = 'folder_rahc-assets';
        break;
      case 'asset':
        fileName = 'asset_rahc-assets';
        break;
      default:
        break;
    }

    downloadFilesAsZip(fileConfig.urls, fileName);
  }

  // get file urls
  function getFileURLs(downloadType: string, trigger: HTMLElement): string[] | null {
    const checked = downloadType === 'selected';
    const parentSelector =
      downloadType === 'asset' ? '[data-asset-parent]' : '[data-folder-parent]';
    const parent = trigger.closest(parentSelector);
    const inputs = getInputs(checked, parent);
    return inputs.map((input) => input.parentElement?.querySelector('[data-download=asset]')?.href);
  }

  // get inputs
  function getInputs(checked: boolean, parent?: HTMLDivElement): HTMLInputElement[] {
    if (!parent) parent = document.querySelector<HTMLDivElement>(toolkitBodySelector);
    if (!parent) return [];

    const inputs = parent.querySelectorAll<HTMLInputElement>('input');
    return checked ? [...inputs].filter((input) => input.checked) : [...inputs];
  }

  // download files as zip
  async function downloadFilesAsZip(urls: string[], zipName: string): Promise<void> {
    const zip = new JSZip();
    const promises = urls.map(async (url) => {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      zip.file(fileName, response.data);
    });

    await Promise.all(promises);
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `${zipName}.zip`;
    link.click();
  }
};
