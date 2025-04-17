const SELECTORS = {
  SORT_LIST: '[data-sort-list-id]',
  ORDER_LIST: '[data-sort-order-id="winners"]',
};

const ATTRIBUTES = {
  SORT_CATEGORY_VALUE: 'data-sort-category',
  SORT_POSITION_VALUE: 'data-sort-position',
  ORDER_ITEM_VALUE: 'data-sort-category-match',
};

const getCategorySlideIndices = () => {
  const orderList = document.querySelector(SELECTORS.ORDER_LIST);
  if (!orderList) {
    console.error('No order list found');
    return {};
  }

  const orderItems = Array.from(orderList.children) as HTMLElement[];
  const categoryOrder = orderItems
    .map((item) => item.getAttribute(ATTRIBUTES.ORDER_ITEM_VALUE))
    .filter(Boolean) as string[];

  // Create an object mapping each category to its starting slide index
  const categoryStartIndices: Record<string, number> = {};
  let currentIndex = 0;

  // Get all sort lists to count items in each category
  const sortLists = document.querySelectorAll(SELECTORS.SORT_LIST);
  if (!sortLists.length) {
    console.error('No sort lists found');
    return {};
  }

  // For each category in order
  categoryOrder.forEach((category) => {
    categoryStartIndices[category] = currentIndex;

    // Count items in this category across all sort lists
    sortLists.forEach((list) => {
      const items = Array.from(list.children) as HTMLElement[];
      const categoryItems = items.filter(
        (item) => item.getAttribute(ATTRIBUTES.SORT_CATEGORY_VALUE) === category
      );
      currentIndex += categoryItems.length;
    });
  });

  return categoryStartIndices;
};

const sortMobileWinnerSwiperItemPosition = () => {
  try {
    const sortLists = document.querySelectorAll(SELECTORS.SORT_LIST);
    const orderList = document.querySelector(SELECTORS.ORDER_LIST);

    if (!orderList) {
      console.error('No order list found');
      return {};
    }

    const orderItems = Array.from(orderList.children) as HTMLElement[];
    const categoryOrder = orderItems
      .map((item) => item.getAttribute(ATTRIBUTES.ORDER_ITEM_VALUE))
      .filter(Boolean) as string[];

    if (!categoryOrder.length) {
      console.error('No category order found');
      return {};
    }

    if (!sortLists.length) {
      console.error('No sort lists found');
      return {};
    }

    sortLists.forEach((list) => {
      const items = Array.from(list.children) as HTMLElement[];

      // Group items by category
      const categorizedItems = items.reduce(
        (acc, item) => {
          const category = item.getAttribute(ATTRIBUTES.SORT_CATEGORY_VALUE) || '';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        },
        {} as Record<string, HTMLElement[]>
      );

      // Sort items within each category by position
      Object.values(categorizedItems).forEach((categoryItems) => {
        categoryItems.sort((a, b) => {
          const posA = parseInt(a.getAttribute(ATTRIBUTES.SORT_POSITION_VALUE) || '0', 10);
          const posB = parseInt(b.getAttribute(ATTRIBUTES.SORT_POSITION_VALUE) || '0', 10);
          return posA - posB;
        });
      });

      // Clear the list
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }

      // Add items back in the order specified by categoryOrder
      categoryOrder.forEach((category) => {
        if (categorizedItems[category]) {
          categorizedItems[category].forEach((item) => {
            list.appendChild(item);
          });
        }
      });
    });
    return;
  } catch (error) {
    console.error('Error in sortMobileWinnerSwiperItemPosition:', error);
    return;
  }
};

export { getCategorySlideIndices, sortMobileWinnerSwiperItemPosition };
