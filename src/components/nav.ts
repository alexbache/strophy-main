import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { handleHashLinkNavigation } from '$utils/handle-hash-link-navigation';
import { BREAKPOINTS } from '$utils/page-utils';

import { isPage } from '../utils/is-page';

/**
 * Animates the logo in the navbar.
 * @returns A cleanup function to remove the event listener
 */
const animateNavLogo = (debug: boolean = false) => {
  const SELECTORS = {
    logo: '.navbar_logo',
  };
  const logo = document.querySelector(SELECTORS.logo);

  if (!logo) {
    console.error('Required logo element not found');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  const isHomepage = isPage('/');

  const initAnimation = () => {
    // Set initial state - hide the logo
    gsap.set(logo, {
      y: isHomepage ? -100 : 0,
      opacity: 0,
    });

    // Create animation
    if (isHomepage) {
      // console.log('Creating homepage animation');
      // Homepage animation with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'main',
          start: '4% top',
          end: 'top 0%',
          scrub: false,
          toggleActions: 'play none none reverse',
          id: 'navLogoAnimation',
          immediateRender: true,
          markers: debug,
          // onEnter: () => console.log('ScrollTrigger entered'),
          // onLeave: () => console.log('ScrollTrigger left'),
        },
      });

      // Animate the logo with y movement
      tl.to(logo, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
      // console.log('Homepage animation timeline created');

      // Force ScrollTrigger to check its position immediately
      ScrollTrigger.refresh();
      // console.log('ScrollTrigger refreshed');
    } else {
      // console.log('Creating non-homepage animation');
      // Other pages - just fade in immediately
      gsap.to(logo, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  initAnimation();

  return () => {
    ScrollTrigger.getById('navLogoAnimation')?.kill();
  };
};

const SELECTORS = {
  banner: '#nav-mobile-banner',
  mobileMenu: '#nav-mobile-menu',
};

const getMobileMenu = () => {
  const banner = document.querySelector(SELECTORS.banner) as HTMLElement;
  const mobileMenu = document.querySelector(SELECTORS.mobileMenu) as HTMLElement;

  return { banner, mobileMenu };
};

/**
 * Sets the padding of the mobile menu based on the height of the banner.
 * This ensures the mobile menu content appears below the banner when opened.
 * @returns A cleanup function to remove the event listener
 */
const navMenuPosition = () => {
  // Only run on mobile and tablet
  if (window.innerWidth >= BREAKPOINTS.TABLET) {
    return () => {}; // Return empty cleanup function
  }

  const { banner, mobileMenu } = getMobileMenu();

  if (!banner || !mobileMenu) {
    console.error('Required banner or mobile menu element not found', {
      banner: banner ? 'found' : 'missing',
      mobileMenu: mobileMenu ? 'found' : 'missing',
    });
    return;
  }

  // Set padding based on banner height
  const setPadding = () => {
    // Only update padding if still on mobile/tablet
    if (window.innerWidth < BREAKPOINTS.TABLET) {
      const bannerHeight = banner.getBoundingClientRect().height;
      const newPadding = `${bannerHeight}px`;
      mobileMenu.style.paddingTop = newPadding;
    }
  };

  // Add a delay to ensure banner height is calculated correctly after page load
  setTimeout(() => {
    setPadding();
  }, 500);

  // Update padding on window resize
  window.addEventListener('resize', setPadding);

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', setPadding);
  };
};

const initNav = () => {
  animateNavLogo();
  getMobileMenu();
  handleHashLinkNavigation();
  navMenuPosition();
};

export { animateNavLogo, getMobileMenu, initNav, navMenuPosition };
