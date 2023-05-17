import { download } from './download';
import { preparation } from './preparation';
import { preview } from './preview';

export const marketingToolkit = () => {
  console.log('marketingToolkit');

  preparation();
  download();
  preview();
};
