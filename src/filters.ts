import { initSwiper } from './entries/imageSwipers';

// Generic selectors that will be used to find filter elements
const SELECTORS = {
  FILTER_GROUP: '[data-filter-button-list-id]',
  FILTER_TRIGGER: '[data-filter-value]',
  FILTER_LIST: '[data-filter-list-id]',
};

const ATTRIBUTES = {
  GROUP_ID: 'data-filter-button-list-id',
  LIST_ID: 'data-filter-list-id',
  FILTER_VALUE: 'data-filter-value',
  FILTER_MATCH: 'data-filter-match',
};

const CLASSES = {
  ACTIVE: 'is-active',
};

export const filters = () => {
  console.log('starting');
  try {
    // Find all filter groups
    const filterGroups = document.querySelectorAll(SELECTORS.FILTER_GROUP);

    if (filterGroups.length === 0) {
      console.warn('No filter groups found on the page');
      return;
    }

    // Initialize each filter system
    filterGroups.forEach((group) => {
      try {
        const groupId = group.getAttribute(ATTRIBUTES.GROUP_ID);
        console.log('groupId', groupId);
        if (!groupId) {
          console.error('Filter group missing ID');
          return;
        }
        initializeFilterSystem(groupId);
      } catch (error) {
        console.error(`Error initializing filter system: ${error}`);
      }
    });
  } catch (error) {
    console.error(`Error in test function: ${error}`);
  }
};

/**
 * Initializes a filter system with the given container ID
 */
function initializeFilterSystem(groupId: string) {
  try {
    // State for this specific filter system
    let activeFilter = '';

    // Find elements for this specific system
    const filterGroup = document.querySelector(
      `[${ATTRIBUTES.GROUP_ID}="${groupId}"]`
    ) as HTMLElement | null;

    const filterLists = document.querySelectorAll(
      `[${ATTRIBUTES.LIST_ID}="${groupId}"]`
    ) as NodeListOf<HTMLElement>;

    console.log('filterLists', filterLists);

    if (!filterGroup) {
      console.error(`Missing filter group: ${groupId}`);
      return;
    }

    if (filterLists.length === 0) {
      console.error(`No filter lists found for group: ${groupId}`);
      return;
    }

    // Store all filter items from all lists
    const allFilterItems: HTMLElement[] = [];
    filterLists.forEach((list) => {
      const items = Array.from(list.children) as HTMLElement[];
      allFilterItems.push(...items);
    });

    if (allFilterItems.length === 0) {
      console.error(`No filter items found in lists for group: ${groupId}`);
      return;
    }

    /**
     * Sets the active filter and updates UI accordingly
     */
    const setActiveFilter = (value: string) => {
      try {
        activeFilter = value;
        updateAllTriggerStyles();
        applyFilter();
      } catch (error) {
        console.error(`Error setting active filter: ${error}`);
      }
    };

    /**
     * Updates a button's styling based on active state
     */
    const updateTriggerStyle = (trigger: HTMLElement, isActive: boolean) => {
      try {
        if (isActive) {
          trigger.classList.add(CLASSES.ACTIVE);
        } else {
          trigger.classList.remove(CLASSES.ACTIVE);
        }
      } catch (error) {
        console.error(`Error updating trigger style: ${error}`);
      }
    };

    /**
     * Updates all button styles based on the current active filter
     */
    const updateAllTriggerStyles = () => {
      try {
        const triggers = filterGroup.querySelectorAll(SELECTORS.FILTER_TRIGGER);
        triggers.forEach((trigger) => {
          const value = trigger.getAttribute(ATTRIBUTES.FILTER_VALUE);
          if (value) {
            updateTriggerStyle(trigger as HTMLElement, value === activeFilter);
          }
        });
      } catch (error) {
        console.error(`Error updating all trigger styles: ${error}`);
      }
    };

    /**
     * Filters the items based on the active filter
     */
    const applyFilter = () => {
      try {
        allFilterItems.forEach((item) => {
          const matchValue = item.getAttribute(ATTRIBUTES.FILTER_MATCH);

          if (!matchValue) {
            console.warn('Item missing match attribute', item);
            return;
          }

          item.style.display = !activeFilter || matchValue === activeFilter ? 'block' : 'none';

          initSwiper();
        });
      } catch (error) {
        console.error(`Error applying filter: ${error}`);
      }
    };

    /**
     * Initializes a button with click handler
     */
    const initTriggers = () => {
      try {
        const triggers = filterGroup.querySelectorAll(
          SELECTORS.FILTER_TRIGGER
        ) as NodeListOf<HTMLElement>;
        triggers.forEach((trigger) => {
          trigger.style.cursor = 'pointer';
          trigger.addEventListener('click', () => {
            const value = trigger.getAttribute(ATTRIBUTES.FILTER_VALUE);
            if (value) {
              setActiveFilter(value);
            }
          });
        });
      } catch (error) {
        console.error(`Error initializing triggers: ${error}`);
      }
    };

    /**
     * Sets initial active filter to the first button's value
     */
    const setInitialFilter = () => {
      const firstTrigger = filterGroup.querySelector(SELECTORS.FILTER_TRIGGER);
      if (!firstTrigger) {
        console.warn('No filter triggers found');
        return;
      }

      const firstValue = firstTrigger.getAttribute(ATTRIBUTES.FILTER_VALUE);
      if (firstValue) {
        setActiveFilter(firstValue);
      }
    };

    /**
     * Initializes the filter functionality
     */
    const init = () => {
      console.log('init');
      try {
        initTriggers();
        setInitialFilter(); // Set initial active filter before applying filter
        applyFilter();
      } catch (error) {
        console.error(`Error in init function: ${error}`);
      }
    };

    // Start the initialization
    init();
  } catch (error) {
    console.error(`Error in initializeFilterSystem: ${error}`);
  }
}
