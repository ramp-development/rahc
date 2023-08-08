import { download } from './download';
import { preparation } from './preparation';
import { preview } from './preview';

export const marketingToolkit = () => {
  preparation();
  download();
  preview();
};
