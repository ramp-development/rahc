import { queryElements } from '$utils/queryElements';

import { buildYourWorld } from './buildYourWorld';
import { contribution } from './contribution';
import { getInvolved } from './getInvolved';
import { marketingToolkit } from './marketingToolkit';
import { supporters } from './supporters';

export const pages = () => {
  const { pathname } = window.location;

  function setInputValues(inputs: HTMLInputElement[], value: string) {
    inputs.forEach((input) => {
      input.value = value;
    });
  }

  const slugInputs = queryElements<HTMLInputElement>('input[name="slug"]');
  setInputValues(slugInputs, pathname);

  const siteInputs = queryElements<HTMLInputElement>('input[name="site"]');

  if (pathname === '/build-your-world') {
    buildYourWorld();
    setInputValues(siteInputs, 'Build your world');
    return;
  }

  if (!pathname.includes('/industry')) {
    setInputValues(siteInputs, 'Customer');
    return;
  }

  setInputValues(siteInputs, 'Industry');

  if (pathname.includes('marketing-toolkit')) return marketingToolkit();
  if (pathname.includes('how-to-get-involved')) return getInvolved();
  if (pathname.includes('make-a-contribution')) return contribution();
  if (pathname.includes('financial-supporters')) return supporters();
};
