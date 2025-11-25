import './pages/home/sections/hero/hero-text-marquee.css';

// Core imports - always needed
import { initContactModal } from './components/contact-modal';
import { initFooter } from './components/footer';
import { initNav } from './components/nav';
import { initPhaseControl } from './components/phase-control';
import { initKlaviyoStyling } from './integrations/klaviyo-forms/klaviyo-styling';
import { handleExternalLinks } from './utils/handle-external-links';
import { isPage } from './utils/is-page';

// Hero animation - load immediately for home page (don't wait for Webflow)
if (isPage('/')) {
  import('./pages/home/sections/hero/hero-images-marquee');
}

window.Webflow ||= [];
window.Webflow.push(async () => {
  // Initialize core components that are used across all pages
  initKlaviyoStyling();
  initNav();
  initPhaseControl();
  initContactModal();
  handleExternalLinks();
  initFooter();

  // Entry/Winner single pages - load dynamically
  if (isPage(['/entries/*', '/winners/*'])) {
    const [{ setPagePageTopPadding }, { entryCMSItemPage }] = await Promise.all([
      import('$utils/page-utils'),
      import('./pages/entries (single)/entry-cms-item-page'),
    ]);
    setPagePageTopPadding();
    entryCMSItemPage();
  }

  // Entries list page - load dynamically
  if (isPage(['/entries'])) {
    const [
      { initSectionRenderer },
      { initFeaturedEntriesLimit },
      { initWinnerItemPosition },
      { initFilters },
      { initSwiper },
    ] = await Promise.all([
      import('./pages/entries/section-renderer'),
      import('./pages/entries/featured-entries-limit'),
      import('./pages/entries/winners'),
      import('./components/filters'),
      import('./pages/entries/image-swipers'),
    ]);
    initSectionRenderer();
    initFeaturedEntriesLimit();
    initWinnerItemPosition();
    initFilters();
    initSwiper('featured-entries');
  }

  // Home page - load dynamically
  if (isPage('/')) {
    const [
      { initHeroMarquee },
      { initHeroTextMarquee },
      { initIntroAnimation },
      { initPrizesBgMarquee },
      { initCashPrizes },
      { initParallaxBackground },
      { initEmailSignupSection },
      { initCompetitionDates },
      { initCategoryLayout },
      { initInspirationImageSlider },
      { initFilters },
      { default: initCategoriesAnimation },
    ] = await Promise.all([
      import('./pages/home/sections/hero/hero-images-marquee'),
      import('./pages/home/sections/hero/hero-text-marquee'),
      import('./pages/home/sections/intro-scene'),
      import('./components/image-marquee'),
      import('./pages/home/sections/cash-prizes'),
      import('./pages/home/sections/parallax-bg'),
      import('./pages/home/sections/email-signup-section'),
      import('./pages/home/sections/competition-dates'),
      import('./pages/home/sections/categories'),
      import('./pages/home/sections/inspiration'),
      import('./components/filters'),
      import('./pages/home/sections/categories-animation'),
    ]);
    initHeroMarquee();
    initHeroTextMarquee();
    initIntroAnimation();
    initPrizesBgMarquee();
    initCashPrizes();
    initParallaxBackground();
    initEmailSignupSection();
    initCompetitionDates();
    initCategoryLayout();
    initInspirationImageSlider();
    initFilters();
    initCategoriesAnimation();
  }

  // Thank you page - load dynamically
  if (isPage('/thank-you')) {
    const { initThankYou } = await import('./pages/thankyou/thank-you');
    initThankYou();
  }
});

window.Webflow.push(async () => {});
