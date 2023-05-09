import { simulateEvent } from '@finsweet/ts-utils';
import Splide from '@splidejs/splide';
import { saveAs } from 'file-saver';
import { link } from 'fs';
import JSZip from 'jszip';

export const home = () => {
  console.log('home');

  // get reference to elements
  const downloadAllTrigger = document.querySelector<HTMLAnchorElement>('[data-download="all"]');
  const downloadSelectedTrigger = document.querySelector<HTMLAnchorElement>(
    '[data-download="selected"]'
  );
  const downloadModalTrigger = document.querySelector<HTMLDivElement>(
    '[data-download="modal-trigger"]'
  );
  const downloadPreviewTrigger = document.querySelector<HTMLDivElement>(
    '[data-download="preview-trigger"]'
  );
  const downloadFolderTrigger = [
    ...document.querySelectorAll<HTMLDivElement>('[data-download="folder"]'),
  ];
  const downloadAssetTrigger = [
    ...document.querySelectorAll<HTMLDivElement>('[data-download="asset"]'),
  ];
  if (
    !downloadAllTrigger ||
    !downloadSelectedTrigger ||
    !downloadModalTrigger ||
    !downloadPreviewTrigger ||
    !downloadFolderTrigger ||
    !downloadAssetTrigger
  )
    return;

  const toolkitForm = document.querySelector<HTMLFormElement>('.toolkit_form');
  const toolkitBody = toolkitForm?.querySelector<HTMLDivElement>('[data-folder-body]');
  const inputs = toolkitForm?.querySelectorAll<HTMLInputElement>('input');
  if (!toolkitForm || !inputs) return;

  // prep the download buttons
  toggleDownloadSelectedButton();

  // prep the folders
  const levels = ['master', 'sub', 'item'] as const;
  levels.forEach((level) => {
    const isMaster = level === 'master';
    const levelFolders = [
      ...document.querySelectorAll<HTMLDivElement>(`[data-folder-level="${level}"]`),
    ];

    levelFolders.forEach((levelFolder) => {
      const item = levelFolder.dataset.folderItem;
      const body = isMaster
        ? levelFolder
        : levelFolder.querySelector<HTMLDivElement>('[data-folder-body]');
      if (!body) return;

      //   find and append folders
      const childFolders = [
        ...document.querySelectorAll<HTMLDivElement>(`[data-folder-parent="${item}"]`),
      ];
      childFolders.forEach((childFolder) => {
        body.append(childFolder);
      });

      //   find and append assets
      const assets = [
        ...document.querySelectorAll<HTMLDivElement>(`[data-asset-parent="${item}"]`),
      ];
      assets.forEach((asset) => {
        body.append(asset);
      });
    });
  });

  // handle checkbox change
  inputs?.forEach((input) => {
    input.addEventListener('change', () => {
      toggleInputActiveState(input);
      toggleDownloadSelectedButton();
    });
  });

  // apply active state to checkbox
  function toggleInputActiveState(input: HTMLInputElement) {
    const icon = input.parentElement?.querySelector<HTMLDivElement>('.toolkit-assets_icon');
    if (!icon) return;

    const isChecked = input.checked;
    if (isChecked) {
      icon.style.display = 'block';
    } else {
      icon?.style.removeProperty('display');
    }
  }

  // handle download buttons
  function toggleDownloadSelectedButton() {
    if (!downloadSelectedTrigger) return;

    const checkedInputs = [...inputs].filter((input) => input.checked);

    if (checkedInputs.length > 0) {
      downloadSelectedTrigger.style.removeProperty('display');
    } else {
      downloadSelectedTrigger.style.display = 'none';
    }
  }

  // download triggers
  // all
  downloadAllTrigger.addEventListener('click', () => {
    const allInputs = getInputs(false);
    const links = allInputs.map(
      (input) => input.closest('[data-asset-parent]')?.querySelector('[data-download=link]')?.href
    );

    downloadAssetsFlow(links, 'all_realamericanhardwood.zip');
  });

  // selected
  downloadSelectedTrigger.addEventListener('click', () => {
    const selectedInputs = getInputs(true);
    const links = selectedInputs.map(
      (input) => input.closest('[data-asset-parent]')?.querySelector('[data-download=link]')?.href
    );

    downloadAssetsFlow(links, 'selected_realamericanhardwood.zip');
  });

  // folder
  downloadFolderTrigger.forEach((trigger) => {
    const parent = trigger.closest<HTMLDivElement>('[data-folder-level]');
    if (!parent) return;

    trigger.addEventListener('click', () => {
      const inputs = getInputs(false, parent);
      const links = inputs.map(
        (input) =>
          input.closest('[data-folder-parent]')?.querySelector('[data-download=link]')?.href
      );

      downloadAssetsFlow(links, 'folder_realamericanhardwood.zip');
    });
  });

  // asset
  downloadAssetTrigger.forEach((trigger) => {
    const parent = trigger.closest<HTMLDivElement>('[data-asset-parent]');
    if (!parent) return;

    trigger.addEventListener('click', () => {
      const inputs = getInputs(false, parent);
      const links = inputs.map(
        (input) =>
          input.closest('[data-folder-parent]')?.querySelector('[data-download=link]')?.href
      );

      downloadAssetsFlow(links, 'asset_realamericanhardwood.zip');
    });
  });

  // get inputs
  function getInputs(
    checked: boolean,
    parent?: HTMLFormElement | HTMLDivElement
  ): HTMLInputElement[] {
    // default the parent to the toolkit form if no parent exists
    if (!parent) parent = toolkitBody;
    if (!parent) return [];

    // get all inputs and return them if checked is false
    const inputs = parent.querySelectorAll<HTMLInputElement>('input');
    if (!checked) return [...inputs];

    // get all checked inputs and return them if checked is true
    const checkedInputs = [...inputs].filter((input) => input.checked);
    return checkedInputs;
  }

  // download flow
  function downloadAssetsFlow(fileUrls: string[], zipFileName = 'files.zip'): void {
    // check if the form has been submitted
    const hasSubmitted = localStorage.getItem('toolkitFormSubmitted');

    // download the assets if it has
    if (hasSubmitted) {
      downloadAssetsAsZip(fileUrls, zipFileName);
      return;
    }

    // open the form if not
    simulateEvent(downloadModalTrigger, 'click');

    // listen for form submission
    toolkitForm?.addEventListener('submit', () => {
      // save to local storage
      localStorage.setItem('toolkitFormSubmitted', 'true');

      // download assets
      downloadAssetsAsZip(fileUrls, zipFileName);
    });
  }

  // download assets
  function downloadAssetsAsZip(fileUrls: string[], zipFileName = 'files.zip'): void {
    alert('DOWNLOADING ASSETS');
  }

  // save function for future use
  async function downloadFilesAsZip(fileUrls: string[], zipFileName = 'files.zip'): Promise<void> {
    const zip = new JSZip();

    // Download each file and add it to the zip
    const downloadPromises = fileUrls.map(async (url, index) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download file at ${url}`);
      }

      const blob = await response.blob();
      const fileName = `file_${index + 1}.${blob.type.split('/')[1]}`; // Create a generic file name with the correct extension
      zip.file(fileName, blob);
    });

    // Wait for all files to be downloaded and added to the zip
    await Promise.all(downloadPromises);

    // Generate the zip file and save it on the client's computer
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, zipFileName);
  }

  // prep preview slider
  const splide = new Splide('.splide', {
    pagination: false,
    perPage: 1,
    perMove: 1,
  });

  splide.mount();

  const previewTriggers = [
    ...document.querySelectorAll<HTMLDivElement>('[data-preview="folder"], [data-preview="asset"]'),
  ];

  const previewLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-preview="asset"]')];

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

      simulateEvent(downloadPreviewTrigger, 'click');
      setTimeout(() => {
        splide.go(index);
      }, 10);
    });
  });
};
