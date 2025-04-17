const SELECTORS = {
  categoryItem: '[categories-element="category-item"]',
  columnLeft: '[categories-element="column-left"]',
  columnRight: '[categories-element="column-right"]',
  layoutGrid: '[categories-element="layout-grid"]',
};

const categoryLayout = () => {
  const categoryItems = document.querySelectorAll(
    SELECTORS.categoryItem
  ) as NodeListOf<HTMLElement>;

  if (!categoryItems.length) {
    console.error(
      'No category items found. Please check that elements with categories-element="category-item" exist.'
    );
    return;
  }

  categoryItems.forEach((item, index) => {
    const layoutGrid = item.querySelector(SELECTORS.layoutGrid) as HTMLElement;
    const columnLeft = item.querySelector(SELECTORS.columnLeft) as HTMLElement;
    const columnRight = item.querySelector(SELECTORS.columnRight) as HTMLElement;

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
      console.error('Required grid elements missing - skipping layout for this item', {
        layoutGrid,
        columnLeft,
        columnRight,
        itemIndex: index,
      });
      return;
    }

    // For every other item (odd indices), swap column positions
    if (index % 2 !== 0) {
      // Move columnLeft to end
      columnLeft.style.gridColumn = '3';
      columnLeft.style.gridRow = '1';
      // Move columnRight to start
      columnRight.style.gridColumn = '1';
      columnRight.style.gridRow = '1';
    }
  });
};

const initCategoryLayout = () => {
  categoryLayout();
};

export { initCategoryLayout };
