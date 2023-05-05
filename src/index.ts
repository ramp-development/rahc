import { pages } from './pages';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('index');
  pages();
});
