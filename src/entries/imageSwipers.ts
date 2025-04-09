import 'swiper/css';
import 'swiper/css/pagination';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import { isMobile } from '$utils/pageUtils';

const initSwiper = () => {
  let swiper: Swiper | null = null;

  const initializeMobileSwiper = () => {
    if (!isMobile()) {
      if (swiper) {
        swiper.destroy();
        swiper = null;
      }
      return;
    }

    // const swiperDiv = document.querySelector('.swiper.mobile-winners') as HTMLElement;

    // TODO - get pagination working. Caution not to add it every time we reinitialise the swiper
    // const paginationDiv = document.createElement('div');
    // paginationDiv.className = 'swiper-pagination';
    // swiperDiv.appendChild(paginationDiv);

    swiper = new Swiper('.swiper.mobile-winners', {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      direction: 'horizontal',
      loop: false, //too few slides to loop
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    });
  };

  // Initial setup
  initializeMobileSwiper();

  // Handle resize events with debouncing
  let resizeTimeout: number;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initializeMobileSwiper();
    }, 250);
  };

  window.addEventListener('resize', handleResize);

  // Return cleanup function
  return () => {
    if (swiper) {
      swiper.destroy();
    }
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimeout);
  };
};

export { initSwiper };
