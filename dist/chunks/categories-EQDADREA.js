import "./chunk-JG2TWXUP.js";

// src/pages/home/sections/categories.ts
var SELECTORS = {
  categoryItem: '[categories-element="category-item"]',
  columnLeft: '[categories-element="column-left"]',
  columnRight: '[categories-element="column-right"]',
  layoutGrid: '[categories-element="layout-grid"]'
};
var categoryLayout = () => {
  const categoryItems = document.querySelectorAll(
    SELECTORS.categoryItem
  );
  if (!categoryItems.length) {
    console.error(
      'No category items found. Please check that elements with categories-element="category-item" exist.'
    );
    return;
  }
  categoryItems.forEach((item, index) => {
    const layoutGrid = item.querySelector(SELECTORS.layoutGrid);
    const columnLeft = item.querySelector(SELECTORS.columnLeft);
    const columnRight = item.querySelector(SELECTORS.columnRight);
    if (!layoutGrid) {
      console.error(
        `Layout grid not found in category item ${index + 1}. Selector: ${SELECTORS.layoutGrid}`
      );
    }
    if (!columnLeft) {
      console.error(
        `Left column not found in category item ${index + 1}. Selector: ${SELECTORS.columnLeft}`
      );
    }
    if (!columnRight) {
      console.error(
        `Right column not found in category item ${index + 1}. Selector: ${SELECTORS.columnRight}`
      );
    }
    if (!layoutGrid || !columnLeft || !columnRight) {
      console.error("Required grid elements missing - skipping layout for this item", {
        layoutGrid,
        columnLeft,
        columnRight,
        itemIndex: index
      });
      return;
    }
    if (index % 2 !== 0) {
      columnLeft.style.gridColumn = "3";
      columnLeft.style.gridRow = "1";
      columnRight.style.gridColumn = "1";
      columnRight.style.gridRow = "1";
    }
  });
};
var initCategoryLayout = () => {
  categoryLayout();
};
export {
  initCategoryLayout
};
//# sourceMappingURL=categories-EQDADREA.js.map
