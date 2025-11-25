import "./chunk-JG2TWXUP.js";

// src/pages/entries/winners.ts
var SELECTORS = {
  cmsList: '[data-alternate-layout="list"]',
  itemPosition: "data-alternate-layout-position",
  infoWrapper: ".entry_info-wrapper",
  itemLayout: '[data-alternate-layout="item"]'
};
var flipWinnerItemPosition = () => {
  const cmsList = document.querySelector(SELECTORS.cmsList);
  if (!cmsList) {
    console.error("CMS list not found");
    return;
  }
  Array.from(cmsList.children).forEach((item) => {
    const position = item.getAttribute(SELECTORS.itemPosition);
    const infoWrapper = item.querySelector(SELECTORS.infoWrapper);
    const itemLayout = item.querySelector(SELECTORS.itemLayout);
    if (position === "2") {
      itemLayout.style.display = "grid";
      itemLayout.style.gridTemplateColumns = "1fr 360px";
      infoWrapper.style.order = "9999";
    }
  });
};
var initWinnerItemPosition = () => {
  flipWinnerItemPosition();
};
export {
  initWinnerItemPosition
};
//# sourceMappingURL=winners-4SLZKJEN.js.map
