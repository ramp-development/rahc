export const supporters = () => {
  console.log('supporters');

  // const lists = document.querySelectorAll('[data-contributor-item="list"]');
  // const rows = [...document.querySelectorAll('[data-contributor-item="row"]')];

  // lists.forEach((list) => {
  //   const slug = list.dataset.contributorGroup;
  //   const items = rows.filter((row) => row.dataset.contributorGroup === slug);
  //   // items.forEach((item) => list.appendChild(item));

  //   console.log(list);
  //   console.log(items);
  // });

  const $list = $('[fs-cmsnest-element="list"]');
  $list.children().each((index, element) => {
    const $element = $(element);
    const $template = $element.find('a');
    const $target = $element.find('[fs-cmsnest-element="nest-target"]');

    console.log($template);
    console.log($target);

    $target.load(`${$template.attr('href')} #target`);
  });

  //   const list = document.querySelector('[fs-cmsnest-element="list"]');
  //   list.childNodes.forEach((node) => {
  //     const templateURL = node.querySelector('a').href;
  //     const nestTarget = node.querySelector('[fs-cmsnest-element="nest-target"]');

  //     console.log(templateURL);
  //     console.log(nestTarget);

  //     // $.ajax({
  //     //   url: templateURL,
  //     //   success: function (result) {
  //     //     $('#div1').html(result);
  //     //   },
  //     // });

  //     $(nestTarget).load(`${templateURL}#target`);
  //   });
};
