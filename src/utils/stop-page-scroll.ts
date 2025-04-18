let observer: MutationObserver | null = null;

/**
 * Toggles the ability to scroll the page body and sets up observers for menu state
 * @param shouldStop - Boolean indicating whether to prevent (true) or allow (false) scrolling
 * @param menuElement - Optional element to observe for style changes
 */
const stopPageScroll = (shouldStop: boolean, menuElement?: HTMLElement) => {
  const { body } = document;
  const html = document.documentElement;

  // If a menu element is provided, set up the observer
  if (menuElement && !observer) {
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          const isOpen = menuElement.style.display !== 'none';
          stopPageScroll(isOpen);
        }
      });
    });

    observer.observe(menuElement, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }

  if (shouldStop) {
    // Store current scroll position
    const { scrollY } = window;

    // Prevent scrolling while maintaining position
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    html.style.scrollBehavior = 'auto';
    console.log('stopping page scroll', {
      scrollY,
      body,
      html,
    });
  } else {
    // Re-enable scrolling and restore position
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    html.style.scrollBehavior = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  return () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };
};

export { stopPageScroll };
