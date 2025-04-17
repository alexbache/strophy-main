const SELECTORS = {
  cmsList: '[data-alternate-layout="list"]',
  itemPosition: 'data-alternate-layout-position',
  infoWrapper: '.entry_info-wrapper',
  itemLayout: '[data-alternate-layout="item"]',
};

/**
 * Selectors used to target DOM elements for winner layout manipulation
 * @constant {Object} SELECTORS
 * @property {string} cmsList - Selector for the CMS list container with alternate layout
 * @property {string} itemPosition - Data attribute for item position
 * @property {string} infoWrapper - Selector for entry info wrapper element
 * @property {string} itemLayout - Selector for item layout container
 */
const flipWinnerItemPosition = () => {
  // console.log('flipItemPosition');
  const cmsList = document.querySelector(SELECTORS.cmsList) as HTMLElement;

  if (!cmsList) {
    console.error('CMS list not found');
    return;
  }

  // console.log('cmsList', cmsList);

  Array.from(cmsList.children).forEach((item: Element) => {
    const position = item.getAttribute(SELECTORS.itemPosition);
    const infoWrapper = item.querySelector(SELECTORS.infoWrapper) as HTMLElement;
    const itemLayout = item.querySelector(SELECTORS.itemLayout) as HTMLElement;

    if (position === '2') {
      itemLayout.style.display = 'grid';
      itemLayout.style.gridTemplateColumns = '1fr 360px';
      // console.log('switching item', item);
      infoWrapper.style.order = '9999';
    }
  });
};

const initWinnerItemPosition = () => {
  flipWinnerItemPosition();
};

export { initWinnerItemPosition };
