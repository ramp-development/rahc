import { restartWebflow } from '@finsweet/ts-utils';

export const supporters = () => {
  console.log('supporters');

  const $list = $('[fs-cmsnest-element="list"]');
  const $children = $list.children();
  let numberLoaded = 0;
  $children.each(function () {
    const $template = $(this).find('a');
    const $target = $(this).find('[fs-cmsnest-element="nest-target"]');

    $target.load(`${$template.attr('href')} #target`, function () {
      numberLoaded += 1;
      if (numberLoaded === $children.length) restartWebflow();
    });
  });
};
