export const entryPage = () => {
  console.log('Initializing entry page navigation');

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
