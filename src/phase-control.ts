/**
 * Constants for DOM element selectors
 */
const PHASE_ELEMENTS = {
  phaseList: '[data-phase-element="list"]',
  timer: '[data-phase-element="timer"]',
  countdownMessage: '[data-phase-element="countdown-message"]',
  statusMessage: '[data-phase-element="status-message"]',
  messageWrapper: '[data-phase-element="message-wrapper"]',
} as const;

/**
 * Constants for data attributes
 */
const PHASE_DATA_SELECTORS = {
  slug: 'data-phase-slug',
  endDate: 'data-phase-date',
} as const;

const PHASE_DATA_CONTROL = {
  controlItem: '[data-phase-element="control"]',
  showAll: '[data-phase-control="show-all"]',
  activePhase: 'data-phase-active',
} as const;

/**
 * Animation constants
 */
const ANIMATION = {
  INITIAL_TRANSFORM: 'translateX(50px)',
  FINAL_TRANSFORM: 'translateX(0)',
  VISIBLE_OPACITY: '1',
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
  timer?: Element;
  countdownMessage?: HTMLElement;
  messageWrapper?: HTMLElement;
}

interface PhaseData {
  phaseList: Element;
  activePhase: string | null;
}

/**
 * Calculates the remaining time until the target date
 * @param targetDate - The end date to count down to
 * @returns TimeRemaining object or null if the date has passed
 */
const calculateTimeRemaining = (targetDate: Date): TimeRemaining | null => {
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();

  if (timeDiff < 0) return null;

  return {
    days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
  };
};

/**
 * Sets the display style of an element
 * @param element - The element to modify
 * @param display - The display value to set
 */
const setElementDisplay = (element: Element, display: 'none' | 'flex'): void => {
  (element as HTMLElement).style.display = display;
};

/**
 * Initializes a single phase item with countdown functionality
 * @param item - The phase item element to initialize
 */
const initializePhaseItem = (item: PhaseItem): void => {
  // Validate required slug attribute
  const slug = item.getAttribute(PHASE_DATA_SELECTORS.slug);
  if (!slug) {
    console.error('Missing required phase slug attribute');
    return;
  }

  // Early returns for missing required elements
  const endDate = item.getAttribute(PHASE_DATA_SELECTORS.endDate);
  if (!endDate) return;

  const timer = item.querySelector(PHASE_ELEMENTS.timer);
  if (!timer) return;

  const countdownMessageElement = item.querySelector(
    PHASE_ELEMENTS.countdownMessage
  ) as HTMLElement;
  const messageWrapper = item.querySelector(PHASE_ELEMENTS.messageWrapper) as HTMLElement;

  // Set initial animation state
  if (messageWrapper) {
    messageWrapper.style.transform = ANIMATION.INITIAL_TRANSFORM;
  }

  // Validate target date
  const targetDate = new Date(endDate);
  if (isNaN(targetDate.getTime())) return;

  // Initialize countdown timer
  const countdownInterval = setInterval(() => {
    const timeRemaining = calculateTimeRemaining(targetDate);

    // Clear interval if countdown is complete
    if (!timeRemaining) {
      clearInterval(countdownInterval);
      if (countdownMessageElement) {
        countdownMessageElement.style.display = 'none';
      }
      return;
    }

    // Update timer display
    const { days, hours, minutes, seconds } = timeRemaining;
    timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s.`;

    // Animate message wrapper
    if (messageWrapper) {
      messageWrapper.style.opacity = ANIMATION.VISIBLE_OPACITY;
      messageWrapper.style.transform = ANIMATION.FINAL_TRANSFORM;
    }
  }, 1000);

  // TODO: Add cleanup function to clear interval on unmount
};

/**
 * Initializes the phase list and controls
 * @returns PhaseData object or null if initialization fails
 */
const getPhaseData = (): PhaseData | null => {
  const phaseList = document.querySelector(PHASE_ELEMENTS.phaseList);

  if (!phaseList) {
    console.error('Phase list not found');
    return null;
  }

  const phaseControl = document.querySelector(PHASE_DATA_CONTROL.controlItem);
  const showAllPhases = phaseControl?.querySelector(PHASE_DATA_CONTROL.showAll) ? true : false;
  const activePhaseElement = phaseControl
    ?.querySelector('[data-phase-active]')
    ?.getAttribute('data-phase-active');

  // Initialize all phase items
  Array.from(phaseList.children).forEach((item) => {
    const slug = item.getAttribute(PHASE_DATA_SELECTORS.slug);

    // Hide all items by default
    setElementDisplay(item, 'none');

    // Show item if it's either showAllPhases or the active phase
    if (showAllPhases || (activePhaseElement && slug === activePhaseElement)) {
      setElementDisplay(item, 'flex');
    }

    initializePhaseItem(item);
  });

  return { phaseList, activePhase: activePhaseElement ?? null };
};

/**
 * Main entry point for phase control functionality
 */
export const phaseControl = () => {
  const data = getPhaseData();
  if (!data) return;

  // TODO: Add additional initialization logic if needed
};
