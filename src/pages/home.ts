export const home = () => {
  console.log('home');

  /**
   * 1. position the folders
   * 2. position the assets
   */

  /**
   * loop through the levels
   * find all folders and append
   * then find all assets and append
   */

  const levels = ['master', 'sub', 'item'];
  levels.forEach((level) => {
    const isMaster = level === 'master';
    const levelFolders = [...document.querySelectorAll(`[data-folder-level="${level}"]`)];

    levelFolders.forEach((levelFolder) => {
      const item = levelFolder.dataset.folderItem;
      const body = isMaster ? levelFolder : levelFolder.querySelector('[data-folder-body]');

      //   find and append folders
      const childFolders = [...document.querySelectorAll(`[data-folder-parent="${item}"]`)];
      childFolders.forEach((childFolder) => {
        body.append(childFolder);
      });

      //   find and append assets
      const assets = [...document.querySelectorAll(`[data-asset-parent="${item}"]`)];
      assets.forEach((asset) => {
        body.append(asset);
      });
    });
  });

  //   const itemHeaders = document.querySelectorAll('.toolkit-folder_header.is-item');
  //   itemHeaders.forEach((itemHeader) => {
  //     itemHeader.addEventListener('click', () => {
  //       itemHeader.classList.toggle('is-active');
  //     });
  //   });
};
