import { footerForm } from './footerForm';
import { initNav } from './nav';

export const components = () => {
  const nav = document.querySelector<HTMLDivElement>('.nav_component');
  if (nav) initNav(nav);

  footerForm();
};
