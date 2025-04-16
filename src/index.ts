import ScrollTrigger from 'gsap/ScrollTrigger';

import { setPagePageTopPadding } from '$utils/pageUtils';

import { imageMarquee, prizesAnimation } from './cash-prizes';
import { categoryLayout } from './categories';
import { competitionDates } from './competition-dates';
import { initContactModal } from './contact-modal';
import { filters } from './entries/filters';
import { entryCMSItemPage } from './entry-cms-item-page';
import { heroImageMarquee } from './hero-marquee';
import { heroLogoMarquee } from './hero-marquee';
import { inspirationImageRowPadding, inspirationImageSlider } from './inspiration';
import { introAnimation } from './intro-scene';
import { initJotForm } from './jotform';
import { initNav } from './nav';
import { parallaxBackground } from './parallax-bg';
import { phaseControl } from './phase-control';
import { isPage } from './utils/ispage';
import { handleExternalLinks } from './utils/links';
import { flipWinnerItemPosition } from './winners';

window.Webflow ||= [];
window.Webflow.push(() => {
  initNav();
  phaseControl();
  initContactModal();
  handleExternalLinks();

  if (isPage(['/entries/*', '/winners/*'])) {
    setPagePageTopPadding();
    entryCMSItemPage();
  }

  if (isPage(['/entries'])) {
    // console.log('entries page');
    filters();
    flipWinnerItemPosition();
  }

  if (isPage('/')) {
    heroImageMarquee();
    heroLogoMarquee();
    introAnimation();
    prizesAnimation();
    imageMarquee();
    parallaxBackground();
    competitionDates();
    categoryLayout();
    inspirationImageRowPadding();
    inspirationImageSlider();
    filters();

    // List all ScrollTrigger instances and their IDs
    const listScrollTriggers = () => {
      const allScrollTriggers = ScrollTrigger.getAll();
      console.log('Active ScrollTrigger instances:', allScrollTriggers.length);

      allScrollTriggers.forEach((trigger) => {
        console.log(`ScrollTrigger ${trigger.vars.id ? `ID: ${trigger.vars.id}` : '(no ID)'}`);
        console.log('- Trigger element:', trigger.trigger);
        console.log('- Start/End:', trigger.start, trigger.end);
        console.log('------------------------');
      });
    };

    // Call after all other ScrollTrigger animations are initialized
    setTimeout(listScrollTriggers, 1000);
  }
});

window.Webflow.push(async () => {
  await initJotForm();
});

window.Webflow.push(() => {
  const navbar = document.querySelector('#navbar');

  // Find all links that point to hash fragments and set scroll behavior to instant
  // Because we have some interactions throughout the page, these interfere with the smooth scroll. We need to set the scroll behavior to instant for these links.
  const hashLinks = navbar?.querySelectorAll('a[href^="/#"]');

  if (hashLinks && hashLinks.length > 0) {
    hashLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (!href) return;

        // If we're not on homepage, redirect first
        if (window.location.pathname !== '/') {
          window.location.href = href;
          return;
        }

        // Otherwise scroll to hash on homepage
        const hash = href.replace('/', '');
        document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' });
      });
    });
  }
});
