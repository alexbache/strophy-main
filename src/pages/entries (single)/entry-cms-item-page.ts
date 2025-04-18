import { isPage } from '$utils/is-page';

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

  if (!list || !nextButton || !prevButton) {
    console.error('CMS elements missing - ', { list, nextButton, prevButton });
    return;
  }

  // Get all list items safely
  const pathnames = Array.from(list.querySelectorAll('a'))
    .map((link) => link.pathname)
    .filter(Boolean); // Remove any undefined or null values

  const currentPath = window.location.pathname;
  const currentIndex = pathnames.indexOf(currentPath);

  const addPreloadLink = (path: string) => {
    try {
      const link = document.createElement('link');
      link.rel = 'prefetch'; // Changed from preload to prefetch
      link.href = path;
      link.type = 'text/html'; // Specify content type

      // Check if link already exists to avoid duplicates
      const existingLink = document.querySelector(`link[href="${path}"]`);
      if (!existingLink) {
        document.head.appendChild(link);
      }
    } catch (error) {
      console.error('Error adding preload link:', error);
    }
  };

  if (currentIndex === 0 && prevButton) {
    prevButton.style.display = 'none';
  } else if (prevButton && currentIndex > 0) {
    const prevPath = pathnames[currentIndex - 1];
    prevButton.href = prevPath;
    addPreloadLink(prevPath);
  }

  // Hide next button if at the last item
  if (currentIndex === pathnames.length - 1 && nextButton) {
    nextButton.style.display = 'none';
  } else if (nextButton && currentIndex >= 0 && currentIndex < pathnames.length - 1) {
    const nextPath = pathnames[currentIndex + 1];
    nextButton.href = nextPath;
    addPreloadLink(nextPath);
  }
};

export { entryCMSItemPage };
