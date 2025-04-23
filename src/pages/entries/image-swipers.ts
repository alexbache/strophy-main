import 'swiper/css';
import 'swiper/css/pagination';
import './image-swipers.css';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import { handleResize } from '$utils/handle-resize';
import { isMobile } from '$utils/page-utils';

import { setFilterValue } from '../../components/filters';
import { SWIPER_SELECTORS } from '../../components/filters';
import { getCategorySlideIndices } from '../entries/winners-mobile';

// Map to store pagination selectors for each group
const paginationSelectors = new Map<string, string>();

const handleSlideChange = (groupId: string, activeIndex: number) => {
  const categoryStartIndices = getCategorySlideIndices();

  // Find the current category by sorting indices and finding the last one that's less than or equal to activeIndex
  const activeCategory = Object.entries(categoryStartIndices)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .sort(([_keyA, valueA], [_keyB, valueB]) => valueB - valueA)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .find(([_key, value]) => value <= activeIndex);

  const currentCategory = activeCategory ? activeCategory[0] : null;
  // Track previous category to detect chang
  if (currentCategory) {
    setFilterValue(groupId, currentCategory, 'swiper');
  }

  return;
};

const initSwiper = (groupId: string) => {
  console.log('initSwiper', groupId);
  console.log('initSwiper paginationSelectors', paginationSelectors);

  let swiper: Swiper | null = null;

  const initializeMobileSwiper = () => {
    if (!isMobile()) {
      if (swiper) {
        swiper.destroy();
        swiper = null;
      }
      return;
    }

    // Check if the groupId exists in SWIPER_SELECTORS
    if (!(groupId in SWIPER_SELECTORS)) {
      console.error(`No swiper selector found for group: ${groupId}`);
      return;
    }

    const swiperSelector = SWIPER_SELECTORS[groupId as keyof typeof SWIPER_SELECTORS];

    const swiperTargetElement = document.querySelector(swiperSelector);
    if (!swiperTargetElement) {
      console.error(`No swiper element found for group: ${groupId}`);
      return;
    }

    // Get existing pagination selector or create new one
    let bulletsEl = paginationSelectors.get(groupId);
    console.log('bulletsEl', bulletsEl);

    if (!bulletsEl) {
      const uniqueId = 'pagination-' + groupId + '-' + Math.floor(Math.random() * 10000);
      bulletsEl = '#' + uniqueId;
      paginationSelectors.set(groupId, bulletsEl);
      console.log('paginationSelectors', paginationSelectors);

      // Only create the pagination element if it doesn't exist
      const existingPagination = swiperTargetElement.querySelector('.swiper-pagination');
      if (!existingPagination) {
        const bulletsHtml = `<div class="swiper-pagination" id="${uniqueId}"></div>`;
        swiperTargetElement.innerHTML += bulletsHtml;
      }
    }

    swiper = new Swiper(swiperSelector, {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      direction: 'horizontal',
      loop: false,
      centeredSlides: true,
      initialSlide: 0,
      pagination: {
        el: bulletsEl,
        dynamicBullets: true,
        clickable: true,
      },
      on: {
        slideChange: ({ activeIndex }) => {
          handleSlideChange(groupId, activeIndex);
        },
      },
    });
  };

  // Initial setup
  initializeMobileSwiper();

  handleResize(initializeMobileSwiper, 100, {
    widthOnly: true,
    threshold: 10,
  });
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

const goToSlide = (groupId: string, slideIndex: number) => {
  const swiper = getSwiperInstance(SWIPER_SELECTORS[groupId as keyof typeof SWIPER_SELECTORS]);
  // console.log(`swiper: ${SWIPER_SELECTORS[groupId as keyof typeof SWIPER_SELECTORS]}`, swiper);
  if (!swiper) return;
  swiper.update();
  swiper.slideTo(slideIndex);
  // console.log('goToSlide', swiper, slideIndex, swiper.activeIndex);
};

export { getSwiperInstance, goToSlide, initSwiper };
