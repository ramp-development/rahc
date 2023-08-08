import { buildYourWorld } from './buildYourWorld';
import { contribution } from './contribution';
import { getInvolved } from './getInvolved';
import { marketingToolkit } from './marketingToolkit';
import { supporters } from './supporters';

export const pages = () => {
  const { pathname } = window.location;

  if (pathname === '/build-your-world') {
    buildYourWorld();
  } else if (!pathname.includes('/industry')) {
    return;
  }

  if (pathname.includes('marketing-toolkit')) return marketingToolkit();
  if (pathname.includes('how-to-get-involved')) return getInvolved();
  if (pathname.includes('make-a-contribution')) return contribution();
  if (pathname.includes('financial-supporters')) return supporters();
};
