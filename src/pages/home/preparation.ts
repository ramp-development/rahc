export const preparation = () => {
  console.log('preparation');

  // get reference to elements
  const toolkitForm = document.querySelector<HTMLFormElement>('.toolkit_form');
  const toolkitBody = toolkitForm?.querySelector<HTMLDivElement>('[data-folder-body]');
  const inputs = toolkitForm?.querySelectorAll<HTMLInputElement>('input');
  if (!toolkitForm || !inputs) return;

  // // prep the download buttons
  // toggleDownloadSelectedButton();

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
      // toggleDownloadSelectedButton();
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

  // // handle download buttons
  // function toggleDownloadSelectedButton() {
  //   if (!downloadSelectedTrigger) return;

  //   const checkedInputs = [...inputs].filter((input) => input.checked);

  //   if (checkedInputs.length > 0) {
  //     downloadSelectedTrigger.style.removeProperty('display');
  //   } else {
  //     downloadSelectedTrigger.style.display = 'none';
  //   }
  // }
};
