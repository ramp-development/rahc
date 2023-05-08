import { saveAs } from 'file-saver';
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
  const downloadFolderTrigger = document.querySelector<HTMLDivElement>('[data-download="folder"]');
  const downloadAssetTrigger = document.querySelector<HTMLDivElement>('[data-download="asset"]');
  if (
    !downloadAllTrigger ||
    !downloadSelectedTrigger ||
    !downloadModalTrigger ||
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

  // handle download buttons
  // /**
  //  * data-download
  //  * ...all / download all assets
  //  * ...selected / download selected assets
  //  * ...form / return
  //  * ...folder / download all assets in folder
  //  * ...asset / download singular asset
  //  */

  downloadAllTrigger.addEventListener('click', () => {
    const allInputs = getInputs(false);
    const links = allInputs.map(
      (input) => input.closest('[data-asset-parent]')?.querySelector('[data-download=link]')?.href
    );

    const zipFileName = 'all_realamericanhardwood.zip';
    downloadFilesAsZip(links, zipFileName);
  });

  downloadSelectedTrigger.addEventListener('click', () => {
    const selectedInputs = getInputs(true);
    const links = selectedInputs.map(
      (input) => input.closest('[data-asset-parent]')?.querySelector('[data-download=link]')?.href
    );

    const zipFileName = 'selected_realamericanhardwood.zip';
    downloadFilesAsZip(links, zipFileName);
  });

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

  /**
   * Plan
   * If the user clicks all or selected, run function
   * If they select a folder or asset, run other function
   */

  /**
   * Plan
   * 1. On click of download, get all checked inputs
   * 2. Check if user has already submitted the form in the past
   * 3. If no, open the form
   * 4. Once the form has been submitted, download the assets
   */
};
