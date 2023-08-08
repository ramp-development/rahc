import { restartWebflow } from '@finsweet/ts-utils';

export const getInvolved = () => {
  const $list = $('[data-nest="list"]');
  const $children = $list.children();
  let numberLoaded = 0;
  $children.each(function () {
    const $template = $(this).find('a[data-nest="link"]');
    const $target = $(this).find('[data-nest="target"]');

    $target.load(`${$template.attr('href')} #target`, function () {
      numberLoaded += 1;
      if (numberLoaded === $children.length) {
        restartWebflow();
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
      }
    });
  });
};
