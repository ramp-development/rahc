initLoco();
function initLoco() {
  const { host, pathname } = window.location;
  if (host.includes('webflow.io') || pathname.includes('/industry')) return;

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector('.c_wrapper'),
    smooth: true,
    smartphone: {
      smooth: false,
    },
    tablet: {
      smooth: false,
    },
    smoothMobile: 1,
    multiplier: 0.6,
  });

  // Wait 2 seconds then calculate the new page height
  setTimeout(() => {
    locoScroll.update();
  }, 2000);

  // Wait for page to fully load then calculate the new page height
  $(window).on('load', function () {
    locoScroll.update();
  });

  //Species Guide Dropdown Loco Update
  $('.c_species_dd').on('click', function () {
    setTimeout(function () {
      locoScroll.update();
    }, 1000);
  });

  //Hardwood Lifestyle Inspo Fitlers Dropdown Loco Update
  $('.c_inspo_filter_item').on('click', function () {
    setTimeout(function () {
      locoScroll.update();
    }, 200);
  });

  //Hardwood Lifestyle See More Loco Update
  $('.c_inspo_pag').on('click', function () {
    setTimeout(function () {
      locoScroll.update();
    }, 400);
  });

  //Hardwood Lifestyle Reset Inspo Fitlers Dropdown Loco Update
  $('#resetFilters').on('click', function () {
    setTimeout(function () {
      locoScroll.update();
    }, 500);
  });

  //Projects Page Dropdown LOCO UPDATE
  $('.c_care_dd').on('click', function () {
    setTimeout(function () {
      locoScroll.update();
    }, 600);
  });

  //After all images are loaded, update locoscroll
  imagesLoaded(document.querySelector('.c_wrapper'), { background: true }, function () {
    locoScroll.update();
  });
}
