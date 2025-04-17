import gsap from 'gsap';

import { isTablet } from '../utils/pageUtils';

/**
 * Constants for DOM element selectors
 */
const SHARED_PHASE_ATTRIBUTES = {
  phaseID: 'data-phase-slug',
  endDate: 'data-phase-date',
} as const;

const PHASE_LOCATIONS = {
  nav: {
    phaseList: '[data-phase-element="nav-list"]',
    timer: '[data-phase-element="nav-timer"]',
    countdownMessage: '[data-phase-element="nav-countdown-message"]',
    messageWrapper: '[data-phase-element="nav-message-wrapper"]',
    ctaButton: '[data-phase-element="nav-cta-button"]',
  },
  banner: {
    phaseList: '[data-phase-element="banner-list"]',
    timer: '[data-phase-element="banner-timer"]',
    countdownMessage: '[data-phase-element="banner-countdown-message"]',
    messageWrapper: '[data-phase-element="banner-message-wrapper"]',
  },
} as const;

const PHASE_DATA_CONTROL = {
  controlItem: '[data-phase-element="control"]',
  showAll: '[data-phase-control="show-all"]',
  activePhase: 'data-phase-active',
} as const;

const MARQUEE_SELECTORS = {
  row: '[banner-marquee-element="row"]',
  item: '[banner-marquee-element="item"]',
  initializedAttr: 'data-marquee-initialized',
} as const;

/**
 * TypeScript interfaces for type safety
 */
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface PhaseItem extends Element {
  _countdownInterval?: number;
}

interface PhaseData {
  phaseList: Element;
  activePhase: string | null;
}

interface PhaseConfig {
  location: keyof typeof PHASE_LOCATIONS;
  showAllPhases: boolean;
  activePhase: string | null;
}

interface MarqueeRow extends Element {
  _timerInterval?: ReturnType<typeof setInterval>;
}

// Add missing variables
let isResizing = false;
let resizeTimeout: ReturnType<typeof setTimeout>;

/**
 * Time calculation and formatting functions
 * @param targetDate - The date to calculate the time remaining to
 * @returns The time remaining to the target date
 */
const calculateTimeRemaining = (targetDate: Date): TimeRemaining | null => {
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();

  if (timeDiff <= 0) return null;

  return {
    days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
  };
};

const formatTimeDisplay = (time: TimeRemaining): string => {
  const { days, hours } = time;
  return `${days}d ${hours}h.`;
};

/**
 * DOM utility functions
 */
const setElementDisplay = (element: Element, display: 'none' | 'flex' | 'block'): void => {
  (element as HTMLElement).style.display = display;
};

const getValidDate = (dateString: string | null): Date | null => {
  if (!dateString) return null;

  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

const showPhaseList = (): void => {
  const phaseList = document.querySelector(PHASE_LOCATIONS.nav.phaseList) as HTMLElement;
  if (!phaseList) return;

  setElementDisplay(phaseList, 'block');
};

/**
 * Nav animation functions
 */
const animateNavMessageIn = (phaseItem: PhaseItem): void => {
  const messageWrapper = phaseItem.querySelector(PHASE_LOCATIONS.nav.messageWrapper);
  const ctaButton = phaseItem.querySelector(PHASE_LOCATIONS.nav.ctaButton);

  showPhaseList();

  gsap.fromTo(
    ctaButton,
    { opacity: 0, x: 0 },
    { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', display: 'block', delay: 0.3 }
  );
  gsap.fromTo(
    messageWrapper,
    { opacity: 0, x: 20, y: 0 },
    { opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.4 }
  );
};

/**
 * Banner/Marquee functions
 */
const setupMarqueeItem = (item: HTMLElement): number => {
  // Configure item styling for marquee
  item.style.flexShrink = '0';
  item.style.whiteSpace = 'nowrap';

  // Calculate width after styling
  const itemWidth = item.getBoundingClientRect().width + 2;
  if (itemWidth > 0) {
    item.style.width = `${itemWidth}px`;
  }

  return itemWidth;
};

const cloneMarqueeItems = (row: Element, originalItem: HTMLElement, itemWidth: number): void => {
  // Calculate how many items we need to fill the screen with some buffer
  const screenWidth = window.innerWidth;
  const maxItems = 20; // Prevent excessive DOM nodes
  const itemsNeeded = Math.min(Math.ceil((screenWidth * 2) / itemWidth) + 2, maxItems);

  // Clone items
  for (let i = 0; i < itemsNeeded - 1; i++) {
    const clone = originalItem.cloneNode(true) as HTMLElement;
    clone.style.width = `${itemWidth}px`;
    row.appendChild(clone);
  }
};

const startMarqueeAnimation = (row: Element, itemWidth: number): void => {
  // Kill any existing animations first
  gsap.killTweensOf(row);
  gsap.killTweensOf(row.children);

  // First make sure all children are visible
  // Fade in and start moving at the same time
  gsap.set(row.children, { opacity: 0 });
  gsap.set(row, { opacity: 0, x: 0 });

  // Animate both the row and children simultaneously
  gsap.to(row.children, {
    opacity: 1,
    duration: 0.3,

    ease: 'power2.out',
  });

  gsap.fromTo(
    row,
    { opacity: 0, x: 0, y: -20 },
    { opacity: 1, x: -itemWidth, y: 0, duration: 0.3, ease: 'power2.out' }
  );

  // Start the infinite marquee animation immediately
  gsap.to(row, {
    x: -itemWidth,
    duration: 8, // Faster speed
    ease: 'none',
    repeat: -1,
    repeatDelay: 0,
    immediateRender: true,
    delay: 0.1,
  });
};

const updateAllTimersInMarquee = (row: Element): void => {
  const items = row.querySelectorAll(MARQUEE_SELECTORS.item);

  items.forEach((item) => {
    const dateAttr = item.getAttribute(SHARED_PHASE_ATTRIBUTES.endDate);
    const targetDate = getValidDate(dateAttr);
    if (!targetDate) return;

    const timer = item.querySelector(PHASE_LOCATIONS.banner.timer);
    if (!timer) return;

    const timeRemaining = calculateTimeRemaining(targetDate);
    if (timeRemaining) {
      timer.textContent = formatTimeDisplay(timeRemaining);
    } else {
      timer.textContent = 'Completed';
    }
  });
};

const initMarqueeTimers = (row: MarqueeRow): void => {
  // Set up interval to update all timers in the marquee
  const updateInterval = setInterval(() => {
    updateAllTimersInMarquee(row);
  }, 1000);

  // Store interval for cleanup
  row._timerInterval = updateInterval;
};

const cleanupMarqueeTimers = (row: MarqueeRow): void => {
  if (row._timerInterval) {
    clearInterval(row._timerInterval);
    delete row._timerInterval;
  }
};

/**
 * Main marquee initialization
 */
const initMarqueeBanner = (): void => {
  // Only initialize on tablet
  if (!isTablet()) {
    const rows = document.querySelectorAll(MARQUEE_SELECTORS.row);
    rows.forEach((row) => {
      gsap.set(row, { opacity: 0 });
      gsap.set(row.children, { opacity: 0 });
      cleanupMarqueeTimers(row as MarqueeRow);
    });
    return;
  }

  const rows = document.querySelectorAll(MARQUEE_SELECTORS.row);
  if (!rows.length) return;

  rows.forEach((row) => {
    // Skip already initialized rows
    if (row.hasAttribute(MARQUEE_SELECTORS.initializedAttr)) return;

    // Clean up any existing timers
    cleanupMarqueeTimers(row as MarqueeRow);

    // Hide everything initially for smooth animation later
    gsap.set(row, { opacity: 0 });
    gsap.set(row.children, { opacity: 0 });

    const originalItem = row.querySelector(MARQUEE_SELECTORS.item) as HTMLElement;
    if (!originalItem) return;

    // Set up the marquee item and get its width
    const itemWidth = setupMarqueeItem(originalItem);
    if (itemWidth === 0) return;

    // Clone items to fill the screen
    cloneMarqueeItems(row, originalItem, itemWidth);

    // Set initial timer values
    updateAllTimersInMarquee(row);

    // Start timer updates
    initMarqueeTimers(row as MarqueeRow);

    // Mark as initialized
    row.setAttribute(MARQUEE_SELECTORS.initializedAttr, 'true');

    // Start the animation
    startMarqueeAnimation(row, itemWidth);
  });
};

let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;

const handleMarqueeResize = (): void => {
  // Check if dimensions actually changed meaningfully
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;

  // Height threshold helps ignore URL bar show/hide on mobile
  if (currentWidth === lastWidth && Math.abs(currentHeight - lastHeight) < 300) {
    return;
  }

  // Update stored dimensions
  lastWidth = currentWidth;
  lastHeight = currentHeight;

  const rows = document.querySelectorAll(MARQUEE_SELECTORS.row);
  if (!rows.length) return;

  // Immediately hide all rows
  rows.forEach((row) => {
    gsap.set(row, { opacity: 0 });
    gsap.set(row.children, { opacity: 0 });
  });

  // If not tablet, just clean up and return
  if (!isTablet()) {
    rows.forEach((row) => {
      cleanupMarqueeTimers(row as MarqueeRow);
    });
    return;
  }

  // Only proceed with cleanup and reinitialization if not already resizing
  if (isResizing) return;
  isResizing = true;

  // Kill all existing animations first
  rows.forEach((row) => {
    gsap.killTweensOf(row);
    gsap.killTweensOf(row.children);
  });

  // Fade out first
  rows.forEach((row) => {
    gsap.to(row, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        // Clean up existing timers
        cleanupMarqueeTimers(row as MarqueeRow);

        // Reset styles
        (row as HTMLElement).style.cssText = '';

        // Preserve original item
        const originalItem = row.querySelector(MARQUEE_SELECTORS.item);
        if (!originalItem) {
          isResizing = false;
          return;
        }

        // Clone and reset the original content
        const originalContent = originalItem.cloneNode(true) as HTMLElement;
        originalContent.style.cssText = '';

        // Reset the row
        row.innerHTML = '';
        row.appendChild(originalContent);
        row.removeAttribute(MARQUEE_SELECTORS.initializedAttr);

        // Reinitialize this specific row
        const itemWidth = setupMarqueeItem(originalContent);
        if (itemWidth === 0) {
          isResizing = false;
          return;
        }

        cloneMarqueeItems(row, originalContent, itemWidth);
        updateAllTimersInMarquee(row);
        initMarqueeTimers(row as MarqueeRow);
        row.setAttribute(MARQUEE_SELECTORS.initializedAttr, 'true');
        startMarqueeAnimation(row, itemWidth);
      },
    });
  });

  // Reset resize flag after all animations complete
  setTimeout(() => {
    isResizing = false;
  }, 300);
};

const createDebouncedResize = (): (() => void) => {
  return () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleMarqueeResize, 150);
  };
};

/**
 * Nav countdown functions
 */
const initNavCountdown = (item: PhaseItem, selectors: (typeof PHASE_LOCATIONS)['nav']): void => {
  const endDateAttr = item.getAttribute(SHARED_PHASE_ATTRIBUTES.endDate);
  const targetDate = getValidDate(endDateAttr);
  const countdownMessage = item.querySelector(selectors.countdownMessage) as HTMLElement;

  if (!targetDate) {
    animateNavMessageIn(item);
    return;
  }

  const timer = item.querySelector(selectors.timer);

  if (!timer) return;

  // Check if countdown is already complete
  const timeRemaining = calculateTimeRemaining(targetDate);

  if (!timeRemaining) {
    // Countdown already complete
    timer.textContent = 'Completed';
    countdownMessage.style.display = 'none';
    animateNavMessageIn(item);
    return;
  }

  // Set initial timer value
  timer.textContent = formatTimeDisplay(timeRemaining);

  // Start countdown interval
  const countdownInterval = setInterval(() => {
    const currentTimeRemaining = calculateTimeRemaining(targetDate);

    if (!currentTimeRemaining) {
      // Countdown just completed
      clearInterval(countdownInterval);
      return;
    }

    // Update timer display
    timer.textContent = formatTimeDisplay(currentTimeRemaining);
  }, 1000);

  // Store interval ID for cleanup
  item._countdownInterval = countdownInterval;

  animateNavMessageIn(item);
};

/**
 * Banner countdown functions
 */
const initBannerCountdown = (
  item: PhaseItem,
  selectors: (typeof PHASE_LOCATIONS)['banner']
): void => {
  const endDateAttr = item.getAttribute(SHARED_PHASE_ATTRIBUTES.endDate);
  const targetDate = getValidDate(endDateAttr);
  if (!targetDate) return;

  const timer = item.querySelector(selectors.timer);
  if (!timer) return;

  const bannerCountdownMessage = item.querySelector(selectors.countdownMessage) as HTMLElement;
  const bannerMessageWrapper = item.querySelector(selectors.messageWrapper) as HTMLElement;

  // Check if countdown is already complete
  const timeRemaining = calculateTimeRemaining(targetDate);

  if (!timeRemaining) {
    // Countdown already complete
    if (bannerCountdownMessage) {
      bannerCountdownMessage.style.display = 'none';
    }

    if (bannerMessageWrapper) {
      bannerMessageWrapper.style.display = 'block';
    }

    timer.textContent = 'Completed';
    return;
  }

  // Set initial timer value
  timer.textContent = formatTimeDisplay(timeRemaining);

  // Banner timers are updated collectively in the marquee function
};

/**
 * Cleanup functions
 */
const cleanupPhaseCounter = (item: PhaseItem): void => {
  if (item._countdownInterval) {
    clearInterval(item._countdownInterval);
    delete item._countdownInterval;
  }
};

/**
 * Phase display initialization
 */
const initPhaseDisplay = (config: PhaseConfig): PhaseData | null => {
  const selectors = PHASE_LOCATIONS[config.location];
  const phaseList = document.querySelector(selectors.phaseList);

  if (!phaseList) {
    console.error(`Phase list not found for ${config.location}`);
    return null;
  }

  // Clean up any existing intervals first
  Array.from(phaseList.children).forEach(cleanupPhaseCounter);

  // Initialize each phase item
  Array.from(phaseList.children).forEach((item) => {
    const phaseID = item.getAttribute(SHARED_PHASE_ATTRIBUTES.phaseID);
    const shouldDisplay =
      config.showAllPhases || (config.activePhase && phaseID === config.activePhase);

    setElementDisplay(item, shouldDisplay ? 'flex' : 'none');

    if (shouldDisplay) {
      if (config.location === 'nav') {
        initNavCountdown(item as PhaseItem, selectors as (typeof PHASE_LOCATIONS)['nav']);
      } else {
        initBannerCountdown(item as PhaseItem, selectors as (typeof PHASE_LOCATIONS)['banner']);
      }
    }
  });

  return { phaseList, activePhase: config.activePhase };
};

/**
 * Main entry point for phase control functionality
 */
const phaseControl = (): (() => void) | void => {
  try {
    // Get configuration from DOM
    const phaseControl = document.querySelector(PHASE_DATA_CONTROL.controlItem);
    const showAllPhases = !!phaseControl?.querySelector(PHASE_DATA_CONTROL.showAll);
    const activePhase =
      phaseControl
        ?.querySelector(`[${PHASE_DATA_CONTROL.activePhase}]`)
        ?.getAttribute(PHASE_DATA_CONTROL.activePhase) ?? null;

    // Initialize nav display first
    const navDisplay = initPhaseDisplay({
      location: 'nav',
      showAllPhases,
      activePhase,
    });

    // Initialize banner display
    const bannerDisplay = initPhaseDisplay({
      location: 'banner',
      showAllPhases,
      activePhase,
    });

    // Initialize marquee banner
    initMarqueeBanner();

    if (!navDisplay && !bannerDisplay) {
      console.warn('Phase displays could not be initialized');
    }

    // Set up resize handler
    const debouncedResize = createDebouncedResize();
    window.addEventListener('resize', debouncedResize);

    // Return cleanup function for SPA environments
    return () => {
      window.removeEventListener('resize', debouncedResize);

      // Clean up all intervals
      if (navDisplay?.phaseList) {
        Array.from(navDisplay.phaseList.children).forEach(cleanupPhaseCounter);
      }

      if (bannerDisplay?.phaseList) {
        Array.from(bannerDisplay.phaseList.children).forEach(cleanupPhaseCounter);
      }

      // Clean up marquee timers
      document.querySelectorAll(MARQUEE_SELECTORS.row).forEach(cleanupMarqueeTimers);
    };
  } catch (error) {
    console.error('Error initializing phase control:', error);
  }
};

const initPhaseControl = () => {
  phaseControl();
};

export { initPhaseControl };
