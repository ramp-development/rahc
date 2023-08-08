export const preparation = () => {
  // element selectors
  const toolkitFormSelector = '.toolkit_form';

  // global elements
  const toolkitForm = document.querySelector<HTMLFormElement>(toolkitFormSelector);
  if (!toolkitForm) return;

  // prep the folders
  const levels = ['master', 'sub', 'item'] as const;
  levels.forEach(processLevel);

  // process a level
  function processLevel(level: string) {
    const isMaster = level === 'master';
    const levelFolders = [
      ...document.querySelectorAll<HTMLDivElement>(`[data-folder-level="${level}"]`),
    ];

    levelFolders.forEach((levelFolder) => {
      const item = levelFolder.dataset.folderItem;
      processLevelFolder(levelFolder, isMaster, item);
    });
  }

  // process a level folder
  function processLevelFolder(levelFolder: HTMLDivElement, isMaster: boolean, item: string) {
    const body = isMaster
      ? levelFolder
      : levelFolder.querySelector<HTMLDivElement>('[data-folder-body]');

    if (!body) return;

    // find and append folders
    appendToParent(body, 'data-folder-parent', item);

    // find and append assets
    appendToParent(body, 'data-asset-parent', item);
  }

  // append to parent
  function appendToParent(parent: HTMLDivElement, selector: string, item: string) {
    const elements = [...document.querySelectorAll<HTMLDivElement>(`[${selector}="${item}"]`)];
    elements.forEach((element) => parent.append(element));
  }
};
