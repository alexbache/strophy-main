const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 992,
};

/**
 * Gets viewport height measurements including full height, navbar height, and inner height
 */
const getViewportHeightMeasurements = (): {
  fullHeight: number;
  navbarHeight: number;
  innerHeight: number;
} => {
  const getHeights = () => {
    const navbar = document.querySelector('#navbar');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    return {
      fullHeight: window.innerHeight,
      navbarHeight,
      innerHeight: window.innerHeight - navbarHeight,
    };
  };

  let heights = getHeights();

  window.addEventListener('resize', () => {
    heights = getHeights();
  });

  return heights;
};

const isTablet = () => {
  return window.innerWidth < 992;
};

const isMobile = () => {
  return window.innerWidth < 768;
};

const isDesktop = () => {
  return window.innerWidth >= 992;
};

const setPagePageTopPadding = () => {
  const updatePadding = () => {
    const { navbarHeight } = getViewportHeightMeasurements();
    const pageWrapper = document.querySelector('.page-wrapper') as HTMLElement;
    if (pageWrapper) {
      pageWrapper.style.paddingTop = `${navbarHeight}px`;
    }
  };

  // Initial call
  updatePadding();

  // Add resize listener
  window.addEventListener('resize', updatePadding);

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', updatePadding);
  };
};

export {
  BREAKPOINTS,
  getViewportHeightMeasurements,
  isDesktop,
  isMobile,
  isTablet,
  setPagePageTopPadding,
};
