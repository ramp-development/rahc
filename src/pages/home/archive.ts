// const downloadAllTrigger = document.querySelector<HTMLAnchorElement>('[data-download="all"]');
// const downloadSelectedTrigger = document.querySelector<HTMLDivElement>(
//   '[data-download="selected"]'
// );
// const downloadFolderTrigger = [
//   ...document.querySelectorAll<HTMLAnchorElement>('[data-download="folder"]'),
// ];
// const downloadAssetTrigger = [
//   ...document.querySelectorAll<HTMLAnchorElement>('[data-download="asset"]'),
// ];

// // all
// downloadAllTrigger.addEventListener('click', () => {
//   const allInputs = getInputs(false);
//   const links = allInputs.map(
//     (input) => input.closest('[data-asset-parent]')?.querySelector('[data-download=link]')?.href
//   );

//   downloadAssetsFlow(links, 'all_realamericanhardwood.zip');
// });

// // all
// downloadAllTrigger.addEventListener('click', () => {
//   downloadAssetsFlow([downloadAllTrigger.href], 'all_realamericanhardwood.zip');
// });

// // selected
// downloadSelectedTrigger.addEventListener('click', () => {
//   // downloadAssetsFlow([downloadSelectedTrigger.href], 'selected_realamericanhardwood.zip');
// });

// // folder
// downloadFolderTrigger.forEach((trigger) => {
//   trigger.addEventListener('click', (event) => {
//     downloadAssetsFlow([trigger.href], 'folder_realamericanhardwood.zip');
//   });
// });

// // asset
// downloadAssetTrigger.forEach((trigger) => {
//   trigger.addEventListener('click', (event) => {
//     downloadAssetsFlow([trigger.href], 'asset_realamericanhardwood.zip');
//   });
// });

// // get inputs
// function getInputs(
//   checked: boolean,
//   parent?: HTMLFormElement | HTMLDivElement
// ): HTMLInputElement[] {
//   // default the parent to the toolkit form if no parent exists
//   if (!parent) parent = toolkitBody;
//   if (!parent) return [];

//   // get all inputs and return them if checked is false
//   const inputs = parent.querySelectorAll<HTMLInputElement>('input');
//   if (!checked) return [...inputs];

//   // get all checked inputs and return them if checked is true
//   const checkedInputs = [...inputs].filter((input) => input.checked);
//   return checkedInputs;
// }

// // download flow
// function downloadAssetsFlow(fileUrls: string[], zipFileName = 'files.zip'): void {
//   // check if the form has been submitted
//   const hasSubmitted = localStorage.getItem('toolkitFormSubmitted');

//   // download the assets if it has
//   if (hasSubmitted) {
//     downloadFiles(fileUrls, zipFileName);
//     return;
//   }

//   // open the form if not
//   simulateEvent(downloadModalTrigger, 'click');

//   // listen for form submission
//   toolkitForm?.addEventListener('submit', () => {
//     // save to local storage
//     localStorage.setItem('toolkitFormSubmitted', 'true');

//     // download assets
//     downloadFiles(fileUrls, zipFileName);
//   });
// }

// // download assets
// async function downloadFiles(assetUrls: string[], zipFileName?: string): Promise<void> {
//   const zip = new JSZip();

//   for (const url of assetUrls) {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const fileName = url.substring(url.lastIndexOf('/') + 1);
//     zip.file(fileName, response.data);
//   }

//   const content = await zip.generateAsync({ type: 'blob' });
//   const downloadUrl = URL.createObjectURL(content);
//   const link = document.createElement('a');
//   link.href = downloadUrl;
//   link.download = 'assets.zip';
//   link.click();
// }

// // download assets
// function downloadAssetsAsZip(fileUrls: string[], zipFileName = 'files.zip'): void {
//   alert('DOWNLOADING ASSETS');
// }

// // save function for future use
// async function downloadFilesAsZip(fileUrls: string[], zipFileName = 'files.zip'): Promise<void> {
//   const zip = new JSZip();

//   // Download each file and add it to the zip
//   const downloadPromises = fileUrls.map(async (url, index) => {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Failed to download file at ${url}`);
//     }

//     const blob = await response.blob();
//     const fileName = `file_${index + 1}.${blob.type.split('/')[1]}`; // Create a generic file name with the correct extension
//     zip.file(fileName, blob);
//   });

//   // Wait for all files to be downloaded and added to the zip
//   await Promise.all(downloadPromises);

//   // Generate the zip file and save it on the client's computer
//   const zipBlob = await zip.generateAsync({ type: 'blob' });
//   saveAs(zipBlob, zipFileName);
// }
