import 'swiper/css';

import Swiper from 'swiper';

const initMobileCategoriesSwiper = () => {
  const swiper = new Swiper('.mobile-categories_swiper', {
    slidesPerView: 'auto',
    // centeredSlides: true,
    // spaceBetween: 'auto',
    wrapperClass: 'mobile-categories_swiper-wrapper',
    slideClass: 'mobile-categories_slide-img',
  });

  return swiper;
};

export { initMobileCategoriesSwiper };
