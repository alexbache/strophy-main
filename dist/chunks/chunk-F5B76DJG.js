import {
  gsapWithCSS
} from "./chunk-6KMKHOBV.js";
import {
  isTablet
} from "./chunk-UQEN3MJC.js";

// src/components/phase-control.ts
var SHARED_PHASE_ATTRIBUTES = {
  phaseID: "data-phase-slug",
  endDate: "data-phase-date"
};
var PHASE_LOCATIONS = {
  nav: {
    phaseList: '[data-phase-element="nav-list"]',
    timer: '[data-phase-element="nav-timer"]',
    countdownMessage: '[data-phase-element="nav-countdown-message"]',
    messageWrapper: '[data-phase-element="nav-message-wrapper"]',
    ctaButton: '[data-phase-element="nav-cta-button"]'
  },
  banner: {
    phaseList: '[data-phase-element="banner-list"]',
    timer: '[data-phase-element="banner-timer"]',
    countdownMessage: '[data-phase-element="banner-countdown-message"]',
    messageWrapper: '[data-phase-element="banner-message-wrapper"]'
  }
};
var PHASE_DATA_CONTROL = {
  controlItem: '[data-phase-element="control"]',
  showAll: '[data-phase-control="show-all"]',
  activePhase: "data-phase-active"
};
var MARQUEE_SELECTORS = {
  row: '[banner-marquee-element="row"]',
  item: '[banner-marquee-element="item"]',
  initializedAttr: "data-marquee-initialized"
};
var isResizing = false;
var resizeTimeout;
var calculateTimeRemaining = (targetDate) => {
  const now = /* @__PURE__ */ new Date();
  const timeDiff = targetDate.getTime() - now.getTime();
  if (timeDiff <= 0) return null;
  return {
    days: Math.floor(timeDiff / (1e3 * 60 * 60 * 24)),
    hours: Math.floor(timeDiff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)),
    minutes: Math.floor(timeDiff % (1e3 * 60 * 60) / (1e3 * 60)),
    seconds: Math.floor(timeDiff % (1e3 * 60) / 1e3)
  };
};
var formatTimeDisplay = (time) => {
  const { days, hours } = time;
  return `${days}d ${hours}h.`;
};
var setElementDisplay = (element, display) => {
  element.style.display = display;
};
var getValidDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};
var showPhaseList = () => {
  const phaseList = document.querySelector(PHASE_LOCATIONS.nav.phaseList);
  if (!phaseList) return;
  setElementDisplay(phaseList, "block");
};
var animateNavMessageIn = (phaseItem) => {
  const messageWrapper = phaseItem.querySelector(PHASE_LOCATIONS.nav.messageWrapper);
  const ctaButton = phaseItem.querySelector(PHASE_LOCATIONS.nav.ctaButton);
  showPhaseList();
  gsapWithCSS.fromTo(
    ctaButton,
    { opacity: 0, x: 0 },
    { opacity: 1, x: 0, duration: 0.3, ease: "power2.out", display: "block", delay: 0.3 }
  );
  gsapWithCSS.fromTo(
    messageWrapper,
    { opacity: 0, x: 20, y: 0 },
    { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out", delay: 0.4 }
  );
};
var setupMarqueeItem = (item) => {
  item.style.flexShrink = "0";
  item.style.whiteSpace = "nowrap";
  const itemWidth = item.getBoundingClientRect().width + 2;
  if (itemWidth > 0) {
    item.style.width = `${itemWidth}px`;
  }
  return itemWidth;
};
var cloneMarqueeItems = (row, originalItem, itemWidth) => {
  const screenWidth = window.innerWidth;
  const maxItems = 20;
  const itemsNeeded = Math.min(Math.ceil(screenWidth * 2 / itemWidth) + 2, maxItems);
  for (let i = 0; i < itemsNeeded - 1; i++) {
    const clone = originalItem.cloneNode(true);
    clone.style.width = `${itemWidth}px`;
    row.appendChild(clone);
  }
};
var startMarqueeAnimation = (row, itemWidth) => {
  gsapWithCSS.killTweensOf(row);
  gsapWithCSS.killTweensOf(row.children);
  gsapWithCSS.set(row.children, { opacity: 0 });
  gsapWithCSS.set(row, { opacity: 0, x: 0 });
  gsapWithCSS.to(row.children, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out"
  });
  gsapWithCSS.fromTo(
    row,
    { opacity: 0, x: 0, y: -20 },
    { opacity: 1, x: -itemWidth, y: 0, duration: 0.3, ease: "power2.out" }
  );
  gsapWithCSS.to(row, {
    x: -itemWidth,
    duration: 45,
    // Faster speed
    ease: "none",
    repeat: -1,
    repeatDelay: 0,
    immediateRender: true,
    delay: 0.1
  });
};
var updateAllTimersInMarquee = (row) => {
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
      timer.textContent = "Completed";
    }
  });
};
var initMarqueeTimers = (row) => {
  const updateInterval = setInterval(() => {
    updateAllTimersInMarquee(row);
  }, 1e3);
  row._timerInterval = updateInterval;
};
var cleanupMarqueeTimers = (row) => {
  if (row._timerInterval) {
    clearInterval(row._timerInterval);
    delete row._timerInterval;
  }
};
var initMarqueeBanner = () => {
  if (!isTablet()) {
    const rows2 = document.querySelectorAll(MARQUEE_SELECTORS.row);
    rows2.forEach((row) => {
      gsapWithCSS.set(row, { opacity: 0 });
      gsapWithCSS.set(row.children, { opacity: 0 });
      cleanupMarqueeTimers(row);
    });
    return;
  }
  const rows = document.querySelectorAll(MARQUEE_SELECTORS.row);
  if (!rows.length) return;
  rows.forEach((row) => {
    if (row.hasAttribute(MARQUEE_SELECTORS.initializedAttr)) return;
    cleanupMarqueeTimers(row);
    gsapWithCSS.set(row, { opacity: 0 });
    gsapWithCSS.set(row.children, { opacity: 0 });
    const originalItem = row.querySelector(MARQUEE_SELECTORS.item);
    if (!originalItem) return;
    const itemWidth = setupMarqueeItem(originalItem);
    if (itemWidth === 0) return;
    cloneMarqueeItems(row, originalItem, itemWidth);
    updateAllTimersInMarquee(row);
    initMarqueeTimers(row);
    row.setAttribute(MARQUEE_SELECTORS.initializedAttr, "true");
    startMarqueeAnimation(row, itemWidth);
  });
};
var lastWidth = window.innerWidth;
var lastHeight = window.innerHeight;
var handleMarqueeResize = () => {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;
  if (currentWidth === lastWidth && Math.abs(currentHeight - lastHeight) < 300) {
    return;
  }
  lastWidth = currentWidth;
  lastHeight = currentHeight;
  const rows = document.querySelectorAll(MARQUEE_SELECTORS.row);
  if (!rows.length) return;
  rows.forEach((row) => {
    gsapWithCSS.set(row, { opacity: 0 });
    gsapWithCSS.set(row.children, { opacity: 0 });
  });
  if (!isTablet()) {
    rows.forEach((row) => {
      cleanupMarqueeTimers(row);
    });
    return;
  }
  if (isResizing) return;
  isResizing = true;
  rows.forEach((row) => {
    gsapWithCSS.killTweensOf(row);
    gsapWithCSS.killTweensOf(row.children);
  });
  rows.forEach((row) => {
    gsapWithCSS.to(row, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        cleanupMarqueeTimers(row);
        row.style.cssText = "";
        const originalItem = row.querySelector(MARQUEE_SELECTORS.item);
        if (!originalItem) {
          isResizing = false;
          return;
        }
        const originalContent = originalItem.cloneNode(true);
        originalContent.style.cssText = "";
        row.innerHTML = "";
        row.appendChild(originalContent);
        row.removeAttribute(MARQUEE_SELECTORS.initializedAttr);
        const itemWidth = setupMarqueeItem(originalContent);
        if (itemWidth === 0) {
          isResizing = false;
          return;
        }
        cloneMarqueeItems(row, originalContent, itemWidth);
        updateAllTimersInMarquee(row);
        initMarqueeTimers(row);
        row.setAttribute(MARQUEE_SELECTORS.initializedAttr, "true");
        startMarqueeAnimation(row, itemWidth);
      }
    });
  });
  setTimeout(() => {
    isResizing = false;
  }, 300);
};
var createDebouncedResize = () => {
  return () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleMarqueeResize, 150);
  };
};
var initNavCountdown = (item, selectors) => {
  const endDateAttr = item.getAttribute(SHARED_PHASE_ATTRIBUTES.endDate);
  const targetDate = getValidDate(endDateAttr);
  const countdownMessage = item.querySelector(selectors.countdownMessage);
  if (!targetDate) {
    animateNavMessageIn(item);
    return;
  }
  const timer = item.querySelector(selectors.timer);
  if (!timer) return;
  const timeRemaining = calculateTimeRemaining(targetDate);
  if (!timeRemaining) {
    timer.textContent = "Completed";
    countdownMessage.style.display = "none";
    animateNavMessageIn(item);
    return;
  }
  timer.textContent = formatTimeDisplay(timeRemaining);
  const countdownInterval = setInterval(() => {
    const currentTimeRemaining = calculateTimeRemaining(targetDate);
    if (!currentTimeRemaining) {
      clearInterval(countdownInterval);
      return;
    }
    timer.textContent = formatTimeDisplay(currentTimeRemaining);
  }, 1e3);
  item._countdownInterval = countdownInterval;
  animateNavMessageIn(item);
};
var initBannerCountdown = (item, selectors) => {
  const endDateAttr = item.getAttribute(SHARED_PHASE_ATTRIBUTES.endDate);
  const targetDate = getValidDate(endDateAttr);
  if (!targetDate) return;
  const timer = item.querySelector(selectors.timer);
  if (!timer) return;
  const bannerCountdownMessage = item.querySelector(selectors.countdownMessage);
  const bannerMessageWrapper = item.querySelector(selectors.messageWrapper);
  const timeRemaining = calculateTimeRemaining(targetDate);
  if (!timeRemaining) {
    if (bannerCountdownMessage) {
      bannerCountdownMessage.style.display = "none";
    }
    if (bannerMessageWrapper) {
      bannerMessageWrapper.style.display = "block";
    }
    timer.textContent = "Completed";
    return;
  }
  timer.textContent = formatTimeDisplay(timeRemaining);
};
var cleanupPhaseCounter = (item) => {
  if (item._countdownInterval) {
    clearInterval(item._countdownInterval);
    delete item._countdownInterval;
  }
};
var initPhaseDisplay = (config) => {
  const selectors = PHASE_LOCATIONS[config.location];
  const phaseList = document.querySelector(selectors.phaseList);
  if (!phaseList) {
    console.error(`Phase list not found for ${config.location}`);
    return null;
  }
  Array.from(phaseList.children).forEach(cleanupPhaseCounter);
  Array.from(phaseList.children).forEach((item) => {
    const phaseID = item.getAttribute(SHARED_PHASE_ATTRIBUTES.phaseID);
    const shouldDisplay = config.showAllPhases || config.activePhase && phaseID === config.activePhase;
    setElementDisplay(item, shouldDisplay ? "flex" : "none");
    if (shouldDisplay) {
      if (config.location === "nav") {
        initNavCountdown(item, selectors);
      } else {
        initBannerCountdown(item, selectors);
      }
    }
  });
  return { phaseList, activePhase: config.activePhase };
};
var phaseControl = () => {
  try {
    const phaseControl2 = document.querySelector(PHASE_DATA_CONTROL.controlItem);
    const showAllPhases = !!phaseControl2?.querySelector(PHASE_DATA_CONTROL.showAll);
    const activePhase = phaseControl2?.querySelector(`[${PHASE_DATA_CONTROL.activePhase}]`)?.getAttribute(PHASE_DATA_CONTROL.activePhase) ?? null;
    const navDisplay = initPhaseDisplay({
      location: "nav",
      showAllPhases,
      activePhase
    });
    const bannerDisplay = initPhaseDisplay({
      location: "banner",
      showAllPhases,
      activePhase
    });
    initMarqueeBanner();
    if (!navDisplay && !bannerDisplay) {
      console.warn("Phase displays could not be initialized");
    }
    const debouncedResize = createDebouncedResize();
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      if (navDisplay?.phaseList) {
        Array.from(navDisplay.phaseList.children).forEach(cleanupPhaseCounter);
      }
      if (bannerDisplay?.phaseList) {
        Array.from(bannerDisplay.phaseList.children).forEach(cleanupPhaseCounter);
      }
      document.querySelectorAll(MARQUEE_SELECTORS.row).forEach(cleanupMarqueeTimers);
    };
  } catch (error) {
    console.error("Error initializing phase control:", error);
  }
};
var getCurrentPhase = () => {
  const phaseControl2 = document.querySelector(PHASE_DATA_CONTROL.controlItem);
  const showAllPhases = !!phaseControl2?.querySelector(PHASE_DATA_CONTROL.showAll);
  const activePhase = phaseControl2?.querySelector(`[${PHASE_DATA_CONTROL.activePhase}]`)?.getAttribute(PHASE_DATA_CONTROL.activePhase) ?? null;
  return { showAllPhases, activePhase };
};
var initPhaseControl = () => {
  phaseControl();
};

export {
  getCurrentPhase,
  initPhaseControl
};
//# sourceMappingURL=chunk-F5B76DJG.js.map
