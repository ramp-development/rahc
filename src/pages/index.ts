import { contribution } from './contribution';
import { getInvolved } from './getInvolved';
import { home } from './home';
import { supporters } from './supporters';

export const pages = () => {
  console.log('pages');
  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      home();
      break;
    case '/how-to-get-involved':
      getInvolved();
      break;
    case '/make-a-contribution':
      contribution();
      break;
    case '/financial-supporters':
      supporters();
      break;
  }
};
