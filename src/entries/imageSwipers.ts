import 'swiper/css';
import 'swiper/css/pagination';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import { isMobile } from '$utils/pageUtils';

import { setFilterValue } from './filters';
import { getCategorySlideIndices } from './winners';

const handleSlideChange = (swiper: Swiper) => {
  const categoryStartIndices = getCategorySlideIndices();
  const { activeIndex } = swiper;

  // Find the current category by sorting indices and finding the last one that's less than or equal to activeIndex
  const activeCategory = Object.entries(categoryStartIndices)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .sort(([_keyA, valueA], [_keyB, valueB]) => valueB - valueA)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .find(([_key, value]) => value <= activeIndex);

  const currentCategory = activeCategory ? activeCategory[0] : null;
  // Track previous category to detect chang
  if (currentCategory) {
    setFilterValue('winners', currentCategory, 'swiper');
  }

  return;
};

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

    // Add delay before initializing swiper

    swiper = new Swiper('.swiper.mobile-winners', {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      direction: 'horizontal',
      loop: false,
      centeredSlides: true,
      initialSlide: 0,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      on: {
        init: () => {
          console.log('swiper initialized with slides:', swiper?.slides.length);
        },
        slideChange: handleSlideChange,
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

/**
 * Gets a Swiper instance from a selector
 * @param selector - The CSS selector to find the Swiper element
 * @returns The Swiper instance if found, null otherwise
 */
const getSwiperInstance = (selector: string): Swiper | null => {
  const swiperElement = document.querySelector(selector);
  if (!swiperElement) return null;

  // Type assertion to access the swiper property
  return (swiperElement as unknown as { swiper: Swiper }).swiper;
};

const goToSlide = (swiperSelector: string, slideIndex: number) => {
  const swiper = getSwiperInstance(swiperSelector);
  console.log(`swiper: ${swiperSelector}`, swiper);
  if (!swiper) return;
  swiper.update();
  swiper.slideTo(slideIndex);
  console.log('goToSlide', swiper, slideIndex, swiper.activeIndex);
};

export { getSwiperInstance, goToSlide, initSwiper };
