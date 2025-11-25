// src/utils/page-utils.ts
var BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 992
};
var getViewportHeightMeasurements = () => {
  const getHeights = () => {
    const navbar = document.querySelector("#navbar");
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    return {
      fullHeight: window.innerHeight,
      navbarHeight,
      innerHeight: window.innerHeight - navbarHeight
    };
  };
  let heights = getHeights();
  window.addEventListener("resize", () => {
    heights = getHeights();
  });
  return heights;
};
var isTablet = () => {
  return window.innerWidth < 992;
};
var isMobile = () => {
  return window.innerWidth < 768;
};
var isDesktop = () => {
  return window.innerWidth >= 992;
};
var setPagePageTopPadding = () => {
  const updatePadding = () => {
    const { navbarHeight } = getViewportHeightMeasurements();
    const pageWrapper = document.querySelector(".page-wrapper");
    if (pageWrapper) {
      pageWrapper.style.paddingTop = `${navbarHeight}px`;
    }
  };
  updatePadding();
  window.addEventListener("resize", updatePadding);
  return () => {
    window.removeEventListener("resize", updatePadding);
  };
};

export {
  BREAKPOINTS,
  getViewportHeightMeasurements,
  isTablet,
  isMobile,
  isDesktop,
  setPagePageTopPadding
};
//# sourceMappingURL=chunk-UQEN3MJC.js.map
