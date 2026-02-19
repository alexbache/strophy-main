import {
  isPage
} from "./chunks/chunk-ISCHIRRL.js";
import "./chunks/chunk-JG2TWXUP.js";

// src/config/component-registry.ts
var COMPONENT_REGISTRY = {
  // Global components - load on every page
  global: [
    {
      id: "nav",
      loader: () => import("./chunks/nav-UFB3B3O3.js"),
      initFunction: "initNav",
      displayName: "Navigation",
      selector: "#navbar"
    },
    {
      id: "logo-marquee",
      loader: () => import("./chunks/logo-marquee-6L5SWCGT.js"),
      initFunction: "initLogoMarquee",
      displayName: "Logo Marquee"
    },
    {
      id: "phase-control",
      loader: () => import("./chunks/phase-control-S7RRPBHS.js"),
      initFunction: "initPhaseControl",
      displayName: "Phase Control"
    },
    {
      id: "contact-modal",
      loader: () => import("./chunks/contact-modal-62VV73LT.js"),
      initFunction: "initContactModal",
      displayName: "Contact Modal",
      selector: "#contact-modal"
    },
    {
      id: "klaviyo-styling",
      loader: () => import("./chunks/klaviyo-styling-OE3DPH5O.js"),
      initFunction: "initKlaviyoStyling",
      displayName: "Klaviyo Forms"
    },
    {
      id: "external-links",
      loader: () => import("./chunks/handle-external-links-VNDGVRIU.js"),
      initFunction: "handleExternalLinks",
      displayName: "External Links Handler"
    }
  ],
  // Page-specific components
  pageSpecific: [
    // Home page components
    {
      id: "intro-animation",
      loader: () => import("./chunks/intro-scene-EDIFB7FS.js"),
      initFunction: "initIntroAnimation",
      routes: "/",
      selector: '[data-section="hero"]',
      displayName: "Intro Animation"
    },
    {
      id: "prizes-bg-marquee",
      loader: () => import("./chunks/image-marquee-SQSNBWMO.js"),
      initFunction: "initPrizesBgMarquee",
      routes: "/",
      displayName: "Prizes Background Marquee"
    },
    {
      id: "cash-prizes",
      loader: () => import("./chunks/cash-prizes-6V4JNYTI.js"),
      initFunction: "initCashPrizes",
      routes: "/",
      displayName: "Cash Prizes Animation"
    },
    {
      id: "parallax-bg",
      loader: () => import("./chunks/parallax-bg-KZBPDY4S.js"),
      initFunction: "initParallaxBackground",
      routes: "/",
      displayName: "Parallax Background"
    },
    {
      id: "email-signup",
      loader: () => import("./chunks/email-signup-section-UFGLJIG4.js"),
      initFunction: "initEmailSignupSection",
      routes: "/",
      displayName: "Email Signup Section"
    },
    {
      id: "competition-dates",
      loader: () => import("./chunks/competition-dates-7IU4T2GJ.js"),
      initFunction: "initCompetitionDates",
      routes: "/",
      displayName: "Competition Dates"
    },
    {
      id: "category-layout",
      loader: () => import("./chunks/categories-EQDADREA.js"),
      initFunction: "initCategoryLayout",
      routes: "/",
      displayName: "Category Layout"
    },
    {
      id: "inspiration-slider",
      loader: () => import("./chunks/inspiration-HQYBWKIY.js"),
      initFunction: "initInspirationImageSlider",
      routes: "/",
      displayName: "Inspiration Slider"
    },
    {
      id: "home-filters",
      loader: () => import("./chunks/filters-MGSCCAVG.js"),
      initFunction: "initFilters",
      routes: "/",
      displayName: "Home Page Filters"
    },
    {
      id: "categories-animation",
      loader: () => import("./chunks/categories-animation-5A3B5VEE.js"),
      initFunction: "default",
      routes: "/",
      displayName: "Categories Animation"
    },
    // Entries list page components
    {
      id: "section-renderer",
      loader: () => import("./chunks/section-renderer-HWJF6ZKE.js"),
      initFunction: "initSectionRenderer",
      routes: "/entries",
      displayName: "Section Renderer"
    },
    {
      id: "entries-list-merge",
      loader: () => import("./chunks/entries-list-merge-ZJMLFK6T.js"),
      initFunction: "initEntriesListMerge",
      routes: "/entries",
      displayName: "Entries List Merge"
    },
    {
      id: "featured-entries-limit",
      loader: () => import("./chunks/featured-entries-limit-FXVHZ3F3.js"),
      initFunction: "initFeaturedEntriesLimit",
      routes: "/entries",
      displayName: "Featured Entries Limit"
    },
    {
      id: "winner-position",
      loader: () => import("./chunks/winners-4SLZKJEN.js"),
      initFunction: "initWinnerItemPosition",
      routes: "/entries",
      displayName: "Winner Item Position"
    },
    {
      id: "entries-filters",
      loader: () => import("./chunks/filters-MGSCCAVG.js"),
      initFunction: "initFilters",
      routes: "/entries",
      displayName: "Entries Page Filters"
    },
    {
      id: "entries-swiper",
      loader: () => import("./chunks/image-swipers-DQY37V2L.js"),
      initFunction: "initSwiper",
      routes: "/entries",
      displayName: "Entries Swiper",
      args: ["featured-entries"]
    },
    // Entry/Winner single pages
    {
      id: "page-top-padding",
      loader: () => import("./chunks/page-utils-IYEIJEPU.js"),
      initFunction: "setPagePageTopPadding",
      routes: ["/entries/*", "/winners/*"],
      displayName: "Page Top Padding"
    },
    {
      id: "entry-cms-page",
      loader: () => import("./chunks/entry-cms-item-page-ZV7KBFPZ.js"),
      initFunction: "entryCMSItemPage",
      routes: ["/entries/*", "/winners/*"],
      displayName: "Entry CMS Item Page"
    },
    // Thank you page
    {
      id: "thank-you",
      loader: () => import("./chunks/thank-you-374UP7CM.js"),
      initFunction: "initThankYou",
      routes: "/thank-you",
      displayName: "Thank You Page"
    }
  ]
};

// src/utils/async-loader.ts
var shouldLoadComponent = (config) => {
  if (config.routes && !isPage(config.routes)) {
    return {
      should: false,
      reason: `Route mismatch (current: ${window.location.pathname})`
    };
  }
  if (config.selector && !document.querySelector(config.selector)) {
    return {
      should: false,
      reason: `Selector not found: ${config.selector}`
    };
  }
  return { should: true };
};
var loadComponentWithRetry = async (config, options = {}) => {
  const { maxRetries = 1, retryDelay = 1e3, debug = false } = options;
  const displayName = config.displayName || config.id;
  const { should, reason } = shouldLoadComponent(config);
  if (!should) {
    if (debug) {
      console.log(`[AsyncLoader] Skipping ${displayName}: ${reason}`);
    }
    return {
      id: config.id,
      success: true,
      skipped: true,
      skipReason: reason
    };
  }
  let lastError = null;
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      if (debug && attempt > 0) {
        console.log(`[AsyncLoader] Retry attempt ${attempt} for ${displayName}`);
      }
      const module = await config.loader();
      const initFn = module[config.initFunction];
      if (typeof initFn !== "function") {
        throw new Error(
          `Init function "${config.initFunction}" not found or not a function in module`
        );
      }
      if (config.args && config.args.length > 0) {
        initFn(...config.args);
      } else {
        initFn();
      }
      if (debug) {
        console.log(`[AsyncLoader] Successfully loaded ${displayName}`);
      }
      return { id: config.id, success: true };
    } catch (error) {
      lastError = error;
      attempt++;
      if (attempt <= maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }
  console.error(
    `[AsyncLoader] Failed to load ${displayName} after ${maxRetries + 1} attempts:`,
    lastError
  );
  return {
    id: config.id,
    success: false,
    error: lastError
  };
};
var loadComponents = async (components, options = {}) => {
  const { debug = false } = options;
  if (debug) {
    console.log(`[AsyncLoader] Starting to load ${components.length} components in parallel`);
  }
  const results = await Promise.allSettled(
    components.map((config) => loadComponentWithRetry(config, options))
  );
  const loadResults = results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    const config = components[index];
    console.error(
      `[AsyncLoader] Unexpected error loading ${config.displayName || config.id}:`,
      result.reason
    );
    return {
      id: config.id,
      success: false,
      error: result.reason,
      skipped: false
    };
  });
  const successful = loadResults.filter((r) => r.success && r.skipped !== true).length;
  const skipped = loadResults.filter((r) => r.skipped === true).length;
  const failed = loadResults.filter((r) => r.success === false).length;
  if (debug || failed > 0) {
    console.log(
      `[AsyncLoader] Load summary: ${successful} successful, ${skipped} skipped, ${failed} failed`
    );
  }
  return loadResults;
};
var loadPageComponents = async (components, options = {}) => {
  const matchingComponents = components.filter((config) => {
    if (!config.routes) return false;
    return isPage(config.routes);
  });
  return loadComponents(matchingComponents, options);
};
var loadGlobalComponents = async (components, options = {}) => {
  return loadComponents(components, options);
};

// src/utils/dom-ready.ts
var waitForDOMReady = () => {
  return new Promise((resolve) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => resolve());
    } else {
      resolve();
    }
  });
};

// src/index.ts
console.log("Index.ts loaded");
waitForDOMReady().then(async () => {
  const [globalResults, pageResults] = await Promise.all([
    loadGlobalComponents(COMPONENT_REGISTRY.global, {
      maxRetries: 1,
      debug: true
    }),
    loadPageComponents(COMPONENT_REGISTRY.pageSpecific, {
      maxRetries: 1,
      debug: true
    })
  ]);
  const allResults = [...globalResults, ...pageResults];
  const failedComponents = allResults.filter((r) => !r.success);
  if (failedComponents.length > 0) {
    console.error(
      "[App] Some components failed to load:",
      failedComponents.map((r) => r.id)
    );
  }
});
//# sourceMappingURL=index.js.map
