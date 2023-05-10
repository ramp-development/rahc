import { download } from './download';
import { preparation } from './preparation';
import { preview } from './preview';

export const home = () => {
  console.log('home');

  preparation();
  download();
  preview();
};
