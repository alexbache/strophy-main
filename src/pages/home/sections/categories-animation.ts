const SELECTORS = {
  categoryItemList: '#categories-list',
};

const initCategoriesAnimation = () => {
  const categoryItemList = document.querySelector(SELECTORS.categoryItemList) as HTMLElement;

  if (!categoryItemList) {
    console.error('No category item list found');
    return;
  }

  const categoryItems = categoryItemList.children;

  if (categoryItems.length === 0) {
    console.error('No category items found');
    return;
  }

  // Get all category triggers
  const categoryTriggers: HTMLElement[] = [];

  Array.from(categoryItems).forEach((item) => {
    const trigger = item.querySelector('.cat-showcase_title-wrap') as HTMLElement;
    if (trigger) {
      categoryTriggers.push(trigger);
    }
  });

  if (categoryTriggers.length === 0) {
    console.error('No category triggers found');
    return;
  }

  // Track the currently active trigger and actively hovered element
  let activeTrigger: HTMLElement | null = null;
  let activelyHoveredElement: HTMLElement | null = null;
  let lastHoveredElement: HTMLElement | null = null; // Track last hovered element
  let isProgrammaticEvent = false; // Flag to prevent recursive calls
  let fallbackTimer: number | null = null; // Timer for fallback

  // Function to dispatch mouseover event to a trigger
  const dispatchMouseover = (trigger: HTMLElement) => {
    isProgrammaticEvent = true;
    trigger.dispatchEvent(
      new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    activeTrigger = trigger;
    isProgrammaticEvent = false;
  };

  // Function to dispatch mouseout event to a trigger
  const dispatchMouseout = (trigger: HTMLElement) => {
    isProgrammaticEvent = true;
    trigger.dispatchEvent(
      new MouseEvent('mouseout', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    isProgrammaticEvent = false;
  };

  // Function to start fallback timer
  const startFallbackTimer = () => {
    // Clear any existing timer
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
    }

    // Start new timer
    fallbackTimer = setTimeout(() => {
      if (!activelyHoveredElement && lastHoveredElement) {
        const firstTrigger = categoryTriggers[0];
        const lastTrigger = categoryTriggers[categoryTriggers.length - 1];

        // Determine fallback based on last hovered element
        let fallbackTrigger: HTMLElement;

        if (lastHoveredElement === lastTrigger) {
          // If last item was hovered, fallback to last item
          fallbackTrigger = lastTrigger;
        } else {
          // Otherwise, fallback to first item
          fallbackTrigger = firstTrigger;
        }

        if (activeTrigger) {
          dispatchMouseout(activeTrigger);
        }
        dispatchMouseover(fallbackTrigger);
      }
    }, 5); // 5ms delay
  };

  // Add mouseover event listeners to all triggers
  categoryTriggers.forEach((trigger) => {
    trigger.addEventListener('mouseover', () => {
      // Skip if this is a programmatic event
      if (isProgrammaticEvent) {
        return;
      }

      activelyHoveredElement = trigger;
      lastHoveredElement = trigger; // Update last hovered element

      // Clear any existing fallback timer
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }

      // Only dispatch if this isn't already the active trigger
      if (activeTrigger !== trigger) {
        // First, dispatch mouseout to the currently active trigger
        if (activeTrigger) {
          dispatchMouseout(activeTrigger);
        }
        // Then dispatch mouseover to the new trigger
        dispatchMouseover(trigger);
      }
    });

    trigger.addEventListener('mouseout', () => {
      // Skip if this is a programmatic event
      if (isProgrammaticEvent) {
        return;
      }

      activelyHoveredElement = null;
      startFallbackTimer();
    });
  });

  // Initialize with the first trigger
  const firstTrigger = categoryTriggers[0];
  if (firstTrigger) {
    dispatchMouseover(firstTrigger);
    lastHoveredElement = firstTrigger; // Set initial last hovered element
  }
};

export default initCategoriesAnimation;
