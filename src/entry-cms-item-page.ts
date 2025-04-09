import { isPage } from '$utils/ispage';

/**
 * Orders the winner CMS list for next/previous navigation.
 * List should be ordered by category and then position within category.
 */
const orderWinnerCMSList = () => {
  if (!isPage(['/winners/*'])) return;

  const SELECTORS = {
    CMS_LIST: '[custom_action="cms_list"]',
    CMS_CATEGORY: 'cms-category',
    CMS_POSITION: 'cms-position',
  };

  const cmsList = document.querySelector(SELECTORS.CMS_LIST) as HTMLElement;

  if (!cmsList) {
    console.error('CMS list not found');
    return;
  }

  const items = Array.from(cmsList.children);

  // Sort items by category and position
  const sortedItems = items.sort((a, b) => {
    const categoryA = a.getAttribute(SELECTORS.CMS_CATEGORY) || '';
    const categoryB = b.getAttribute(SELECTORS.CMS_CATEGORY) || '';
    const positionA = parseInt(a.getAttribute(SELECTORS.CMS_POSITION) || '0', 10);
    const positionB = parseInt(b.getAttribute(SELECTORS.CMS_POSITION) || '0', 10);

    // First compare categories
    if (categoryA !== categoryB) {
      return categoryA.localeCompare(categoryB);
    }
    // If categories are the same, compare positions
    return positionA - positionB;
  });

  // Reorder DOM elements
  sortedItems.forEach((item) => {
    cmsList.appendChild(item);
  });

  console.log('Sorted items:', sortedItems);
};

const entryCMSItemPage = () => {
  console.log('Initializing entry page navigation');

  orderWinnerCMSList();

  const nextButton = document.querySelector('[custom_action="btn_next_cms"]') as HTMLAnchorElement;
  const prevButton = document.querySelector('[custom_action="btn_prev_cms"]') as HTMLAnchorElement;
  const list = document.querySelector('[custom_action="cms_list"]') as HTMLElement;

  console.log('Found elements:', {
    nextButton: !!nextButton,
    prevButton: !!prevButton,
    list: !!list,
  });

  if (!list) {
    console.error('CMS list not found');
    return;
  }

  // Get all list items safely
  const pathnames = Array.from(list.querySelectorAll('a'))
    .map((link) => link.pathname)
    .filter(Boolean); // Remove any undefined or null values

  console.log('Found pathnames:', pathnames);

  const currentPath = window.location.pathname;
  const currentIndex = pathnames.indexOf(currentPath);

  console.log('Current navigation state:', {
    currentPath,
    currentIndex,
    totalItems: pathnames.length,
  });

  // Hide prev button if at the first item
  if (currentIndex === 0 && prevButton) {
    console.log('At first item - hiding prev button');
    prevButton.style.display = 'none';
  } else if (prevButton && currentIndex > 0) {
    prevButton.href = pathnames[currentIndex - 1];
  }

  // Hide next button if at the last item
  if (currentIndex === pathnames.length - 1 && nextButton) {
    console.log('At last item - hiding next button');
    nextButton.style.display = 'none';
  } else if (nextButton && currentIndex >= 0 && currentIndex < pathnames.length - 1) {
    nextButton.href = pathnames[currentIndex + 1];
  }

  console.log('Navigation hrefs updated');
};

export { entryCMSItemPage };
