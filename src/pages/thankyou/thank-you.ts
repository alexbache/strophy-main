import { getViewportHeightMeasurements } from '$utils/page-utils';

const sectionResize = () => {
  const { innerHeight, navbarHeight } = getViewportHeightMeasurements();
  const section = document.querySelector('#thank-you') as HTMLElement;
  if (!section) console.error('Thank you section not found - #thank-you');
  if (section) {
    section.style.height = `${innerHeight}px`;
    section.style.paddingBottom = `${navbarHeight}px`;
  }
};

const initThankYou = () => {
  sectionResize();
};

export { initThankYou };
