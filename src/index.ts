import { setPagePageTopPadding } from 'src/utils/pageUtils';

import { initContactModal } from './components/contact-modal';
import { initFilters } from './components/filters';
import { initImageMarquee } from './components/image-marquee';
import { initNav } from './components/nav';
import { initPhaseControl } from './components/phase-control';
import { entryCMSItemPage } from './pages/entries (single)/entry-cms-item-page';
import { initWinnerItemPosition } from './pages/entries/winners';
import { initCashPrizes } from './pages/home/sections/cash-prizes';
import { initCategoryLayout } from './pages/home/sections/categories';
import { initCompetitionDates } from './pages/home/sections/competition-dates';
import { initEmailSignupSection } from './pages/home/sections/email-signup-section';
import { initHeroMarquee } from './pages/home/sections/hero-marquee';
import { initInspirationImageSlider } from './pages/home/sections/inspiration';
import { initIntroAnimation } from './pages/home/sections/intro-scene';
import { initParallaxBackground } from './pages/home/sections/parallax-bg';
import { handleExternalLinks } from './utils/handleExternalLinks';
import { isPage } from './utils/isPage';

window.Webflow ||= [];
window.Webflow.push(() => {
  initNav();
  initPhaseControl();
  initContactModal();
  handleExternalLinks();

  if (isPage(['/entries/*', '/winners/*'])) {
    setPagePageTopPadding();
    entryCMSItemPage();
  }

  if (isPage(['/entries'])) {
    // console.log('entries page');
    initFilters();
    initWinnerItemPosition();
  }

  if (isPage('/')) {
    initHeroMarquee();
    initIntroAnimation();
    initCashPrizes();
    initImageMarquee();
    initParallaxBackground();
    initEmailSignupSection();
    initCompetitionDates();
    initCategoryLayout();
    initInspirationImageSlider();
    initFilters();
  }
});

window.Webflow.push(async () => {});
