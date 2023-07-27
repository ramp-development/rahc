import { dropdownSliders } from './dropdownSliders';
import { media } from './media';
import { themeSelector } from './themeSelector';

export const buildYourWorld = () => {
  console.log('buildYourWorld');
  themeSelector();
  dropdownSliders();
  media();
};
