// Type definitions
export type ComponentConfig = {
  // Unique identifier for the component
  id: string;

  // Dynamic import function returning the module
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader: () => Promise<any>;

  // Name of the exported init function
  initFunction: string;

  // Optional: DOM selector to check before loading
  // If provided, component only loads if selector exists
  selector?: string;

  // Optional: Routes where this component should load
  // Omit for global components
  routes?: string | string[];

  // Optional: Display name for logging
  displayName?: string;

  // Optional: Arguments to pass to the init function
  args?: unknown[];
};

export type ComponentRegistry = {
  global: ComponentConfig[];
  pageSpecific: ComponentConfig[];
};

// Component Registry Configuration
export const COMPONENT_REGISTRY: ComponentRegistry = {
  // Global components - load on every page
  global: [
    {
      id: 'nav',
      loader: () => import('../components/nav'),
      initFunction: 'initNav',
      displayName: 'Navigation',
      selector: '#navbar',
    },
    {
      id: 'logo-marquee',
      loader: () => import('../components/logo-marquee/logo-marquee'),
      initFunction: 'initLogoMarquee',
      displayName: 'Logo Marquee',
    },
    {
      id: 'phase-control',
      loader: () => import('../components/phase-control'),
      initFunction: 'initPhaseControl',
      displayName: 'Phase Control',
    },
    {
      id: 'contact-modal',
      loader: () => import('../components/contact-modal'),
      initFunction: 'initContactModal',
      displayName: 'Contact Modal',
      selector: '#contact-modal',
    },
    {
      id: 'klaviyo-styling',
      loader: () => import('../integrations/klaviyo-forms/klaviyo-styling'),
      initFunction: 'initKlaviyoStyling',
      displayName: 'Klaviyo Forms',
    },
    {
      id: 'external-links',
      loader: () => import('../utils/handle-external-links'),
      initFunction: 'handleExternalLinks',
      displayName: 'External Links Handler',
    },
  ],

  // Page-specific components
  pageSpecific: [
    // Home page components
    {
      id: 'intro-animation',
      loader: () => import('../pages/home/sections/intro-scene'),
      initFunction: 'initIntroAnimation',
      routes: '/',
      selector: '[data-section="hero"]',
      displayName: 'Intro Animation',
    },
    {
      id: 'prizes-bg-marquee',
      loader: () => import('../components/image-marquee'),
      initFunction: 'initPrizesBgMarquee',
      routes: '/',
      displayName: 'Prizes Background Marquee',
    },
    {
      id: 'cash-prizes',
      loader: () => import('../pages/home/sections/cash-prizes'),
      initFunction: 'initCashPrizes',
      routes: '/',
      displayName: 'Cash Prizes Animation',
    },
    {
      id: 'parallax-bg',
      loader: () => import('../pages/home/sections/parallax-bg'),
      initFunction: 'initParallaxBackground',
      routes: '/',
      displayName: 'Parallax Background',
    },
    {
      id: 'email-signup',
      loader: () => import('../pages/home/sections/email-signup-section'),
      initFunction: 'initEmailSignupSection',
      routes: '/',
      displayName: 'Email Signup Section',
    },
    {
      id: 'competition-dates',
      loader: () => import('../pages/home/sections/competition-dates'),
      initFunction: 'initCompetitionDates',
      routes: '/',
      displayName: 'Competition Dates',
    },
    {
      id: 'category-layout',
      loader: () => import('../pages/home/sections/categories'),
      initFunction: 'initCategoryLayout',
      routes: '/',
      displayName: 'Category Layout',
    },
    {
      id: 'inspiration-slider',
      loader: () => import('../pages/home/sections/inspiration'),
      initFunction: 'initInspirationImageSlider',
      routes: '/',
      displayName: 'Inspiration Slider',
    },
    {
      id: 'home-filters',
      loader: () => import('../components/filters'),
      initFunction: 'initFilters',
      routes: '/',
      displayName: 'Home Page Filters',
    },
    {
      id: 'categories-animation',
      loader: () => import('../pages/home/sections/categories-animation'),
      initFunction: 'default',
      routes: '/',
      displayName: 'Categories Animation',
    },

    // Entries list page components
    {
      id: 'section-renderer',
      loader: () => import('../pages/entries/section-renderer'),
      initFunction: 'initSectionRenderer',
      routes: '/entries',
      displayName: 'Section Renderer',
    },
    {
      id: 'featured-entries-limit',
      loader: () => import('../pages/entries/featured-entries-limit'),
      initFunction: 'initFeaturedEntriesLimit',
      routes: '/entries',
      displayName: 'Featured Entries Limit',
    },
    {
      id: 'winner-position',
      loader: () => import('../pages/entries/winners'),
      initFunction: 'initWinnerItemPosition',
      routes: '/entries',
      displayName: 'Winner Item Position',
    },
    {
      id: 'entries-filters',
      loader: () => import('../components/filters'),
      initFunction: 'initFilters',
      routes: '/entries',
      displayName: 'Entries Page Filters',
    },
    {
      id: 'entries-swiper',
      loader: () => import('../pages/entries/image-swipers'),
      initFunction: 'initSwiper',
      routes: '/entries',
      displayName: 'Entries Swiper',
      args: ['featured-entries'],
    },

    // Entry/Winner single pages
    {
      id: 'page-top-padding',
      loader: () => import('../utils/page-utils'),
      initFunction: 'setPagePageTopPadding',
      routes: ['/entries/*', '/winners/*'],
      displayName: 'Page Top Padding',
    },
    {
      id: 'entry-cms-page',
      loader: () => import('../pages/entries (single)/entry-cms-item-page'),
      initFunction: 'entryCMSItemPage',
      routes: ['/entries/*', '/winners/*'],
      displayName: 'Entry CMS Item Page',
    },

    // Thank you page
    {
      id: 'thank-you',
      loader: () => import('../pages/thankyou/thank-you'),
      initFunction: 'initThankYou',
      routes: '/thank-you',
      displayName: 'Thank You Page',
    },
  ],
};
