import { setPagePageTopPadding } from '$utils/page-utils';

import { initContactModal } from './components/contact-modal';
import { initFilters } from './components/filters';
import { initFooter } from './components/footer';
import { initPrizesBgMarquee } from './components/image-marquee';
import { initNav } from './components/nav';
import { initPhaseControl } from './components/phase-control';
import { initKlaviyoScript } from './integrations/klaviyo-forms/klaviyo-script';
import { initKlaviyoStyling } from './integrations/klaviyo-forms/klaviyo-styling';
import { entryCMSItemPage } from './pages/entries (single)/entry-cms-item-page';
import { initFeaturedEntriesLimit } from './pages/entries/featured-entries-limit';
import { initSwiper } from './pages/entries/image-swipers';
import { initSectionRenderer } from './pages/entries/section-renderer';
import { initWinnerItemPosition } from './pages/entries/winners';
import { initCashPrizes } from './pages/home/sections/cash-prizes';
import { initCategoryLayout } from './pages/home/sections/categories';
import { initCompetitionDates } from './pages/home/sections/competition-dates';
import { initEmailSignupSection } from './pages/home/sections/email-signup-section';
import { initHeroMarquee } from './pages/home/sections/hero-marquee';
import { initHeroTextMarquee } from './pages/home/sections/hero-text-marquee';
import { initInspirationImageSlider } from './pages/home/sections/inspiration';
import { initIntroAnimation } from './pages/home/sections/intro-scene';
import { initParallaxBackground } from './pages/home/sections/parallax-bg';
import { initThankYou } from './pages/thankyou/thank-you';
import { handleExternalLinks } from './utils/handle-external-links';
import { isPage } from './utils/is-page';

window.Webflow ||= [];
window.Webflow.push(() => {
  initKlaviyoScript();
  initKlaviyoStyling();
  initNav();
  initPhaseControl();
  initContactModal();
  handleExternalLinks();
  initFooter();
  if (isPage(['/entries/*', '/winners/*'])) {
    setPagePageTopPadding();
    entryCMSItemPage();
  }

  if (isPage(['/entries'])) {
    initSectionRenderer();
    initFeaturedEntriesLimit();
    initWinnerItemPosition();
    initFilters();
    initSwiper('featured-entries');
  }

  if (isPage('/')) {
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
  }

  if (isPage('/thank-you')) {
    initThankYou();
  }
});

window.Webflow.push(async () => {});
