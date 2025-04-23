import { goToSlide, initSwiper } from '../pages/entries/image-swipers';
import {
  getCategorySlideIndices,
  sortMobileWinnerSwiperItemPosition,
} from '../pages/entries/winners-mobile';

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
  SWIPER_ID: 'data-filter-swiper-id',
};

const CLASSES = {
  ACTIVE: 'is-active',
};

export const SWIPER_SELECTORS = {
  winners: '.swiper.mobile-winners',
  'featured-entries': '.swiper.featured-entries',
};

type FilterState = {
  setFilter: (value: string, source: FilterState['source'], groupId: string) => void;
  currentValue: string;
  source: 'button' | 'swiper' | 'initial';
  hasSwiper: boolean;
};

const actionHandlers = {
  hide: (groupId: string, activeFilter: string) => {
    const filterLists = document.querySelectorAll(
      `[${ATTRIBUTES.LIST_ID}="${groupId}"]`
    ) as NodeListOf<HTMLElement>;

    if (filterLists.length === 0) {
      console.error(`No filter lists found for group: ${groupId}`);
      return;
    }
    // Store all filter items from all lists
    const allFilterListItems: HTMLElement[] = [];
    filterLists.forEach((list) => {
      const items = Array.from(list.children) as HTMLElement[];
      allFilterListItems.push(...items);
    });

    if (allFilterListItems.length === 0) {
      console.error(`No filter items found in lists for group: ${groupId}`);
      return;
    }

    allFilterListItems.forEach((item) => {
      const matchValue = item.getAttribute(ATTRIBUTES.FILTER_MATCH);
      if (!matchValue) {
        console.error('Item missing match attribute', item);
        return;
      }

      const newDisplay = !activeFilter || matchValue === activeFilter ? 'block' : 'none';
      if (item.style.display !== newDisplay) {
        item.style.display = newDisplay;
      }
    });
  },
  goToCategorySlide: (groupId: string, categoryString: string) => {
    sortMobileWinnerSwiperItemPosition();
    const categoryStartIndices = getCategorySlideIndices();
    const slideIndex = categoryStartIndices[categoryString];

    goToSlide(groupId, slideIndex);
  },
};

/**
 * Updates a button's styling based on active state
 */
const updateTriggerStyle = (
  trigger: HTMLElement,
  isActive: boolean,
  source: FilterState['source'],
  groupId: string
) => {
  try {
    if (isActive) {
      trigger.classList.add(CLASSES.ACTIVE);
      // Only scroll into view if triggered by swiper
      if (source === 'swiper' && FILTER_STATE.get(groupId)?.hasSwiper) {
        trigger.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
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
const updateAllTriggerStyles = (
  filterGroup: HTMLElement,
  activeFilter: string,
  source: FilterState['source'],
  groupId: string
) => {
  if (!filterGroup || !activeFilter) {
    console.error('Missing params for updateAllTriggerStyles');
    return;
  }
  const triggers = filterGroup.querySelectorAll(SELECTORS.FILTER_TRIGGER);
  triggers.forEach((trigger) => {
    const value = trigger.getAttribute(ATTRIBUTES.FILTER_VALUE);
    if (value) {
      updateTriggerStyle(trigger as HTMLElement, value === activeFilter, source, groupId);
    }
  });
};

/**     * Filters the items based on the active filter
 */
const applyFilter = (groupId: string, activeFilter: string, source: FilterState['source']) => {
  try {
    actionHandlers.hide(groupId, activeFilter);
    if (source === 'button') {
      actionHandlers.goToCategorySlide(groupId, activeFilter);
    }
  } catch (error) {
    console.error(`Error applying filter: ${error}`);
  }
};

// Add this at the top with other constants
const INITIALIZED_GROUPS = new Set();

// Update the Map type
const FILTER_STATE = new Map<string, FilterState>();

/**
 * Initializes a filter system with the given container ID
 */
function initializeFilterSystem(groupId: string) {
  // Prevent multiple initializations of the same group
  if (INITIALIZED_GROUPS.has(groupId)) {
    return;
  }
  INITIALIZED_GROUPS.add(groupId);

  try {
    let activeFilter = '';
    const filterGroup = document.querySelector(
      `[${ATTRIBUTES.GROUP_ID}="${groupId}"]`
    ) as HTMLElement | null;

    if (!filterGroup) {
      console.error(`Missing filter group: ${groupId}`);
      return;
    }

    const setActiveFilter = (value: string, source: FilterState['source'], groupId: string) => {
      try {
        activeFilter = value;
        const currentState = FILTER_STATE.get(groupId);
        if (currentState) {
          currentState.currentValue = value;
          currentState.source = source;
        }
        updateAllTriggerStyles(filterGroup, activeFilter, source, groupId);
        applyFilter(groupId, activeFilter, source);
      } catch (error) {
        console.error(`Error setting active filter: ${error}`);
      }
    };

    // Store both the setter and initial value
    FILTER_STATE.set(groupId, {
      setFilter: setActiveFilter,
      currentValue: activeFilter,
      source: 'initial',
      hasSwiper: false,
    });

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
              setActiveFilter(value, 'button', groupId);
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
        console.error('No filter triggers found');
        return;
      }

      const firstValue = firstTrigger.getAttribute(ATTRIBUTES.FILTER_VALUE);
      if (firstValue) {
        setActiveFilter(firstValue, 'initial', groupId);
      }
    };

    const setHasSwiper = (hasSwiper: boolean) => {
      const currentState = FILTER_STATE.get(groupId);
      if (currentState) {
        currentState.hasSwiper = hasSwiper;
      }
    };

    /**
     * Initializes the filter functionality
     */
    const init = () => {
      try {
        initTriggers();
        setInitialFilter();
        const swiperId = document
          .querySelector(`[${ATTRIBUTES.SWIPER_ID}="${groupId}"]`)
          ?.getAttribute(ATTRIBUTES.SWIPER_ID);
        if (swiperId) {
          initSwiper(swiperId);
          setHasSwiper(true);
        }

        // Initialize the featured entries swiper
        // initSwiper('featured-entries');
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

const filters = () => {
  sortMobileWinnerSwiperItemPosition();
  try {
    // Find all filter groups
    const filterGroups = document.querySelectorAll(SELECTORS.FILTER_GROUP);

    if (filterGroups.length === 0) {
      console.error('No filter groups found on the page');
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
    console.error(`Error in filters function: ${error}`);
  }
};

// Update the setter function and add a getter
export function setFilterValue(groupId: string, value: string, source: FilterState['source']) {
  const filterState = FILTER_STATE.get(groupId);
  if (!filterState) {
    console.warn(`No filter state for group: ${groupId}`);
    return;
  }
  if (filterState.currentValue !== value) {
    filterState.setFilter(value, source, groupId);
  }
}

export function getCurrentFilterValue(groupId: string): string | undefined {
  return FILTER_STATE.get(groupId)?.currentValue;
}

const initFilters = () => {
  filters();
};

export { initFilters };
