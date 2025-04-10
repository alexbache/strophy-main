import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BREAKPOINTS } from '$utils/pageUtils';

import { introState } from '../intro-scene';
import { isPage } from '../utils/ispage';

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

const handleHashLinkNavigation = () => {
  const navbar = document.querySelector('#navbar');
  const headingWrap = document.querySelector('#intro-heading-wrap');

  console.log('Nav initialization:', {
    navbarFound: !!navbar,
    headingWrapFound: !!headingWrap,
  });

  const getIntroOffset = () => {
    if (!headingWrap || !headingWrap.matches('#intro-heading-wrap')) {
      console.log('No intro offset - heading wrap not found');
      return 0;
    }

    // If animation hasn't started yet, return initial height
    if (!introState.isAnimationComplete) {
      const initialHeight = window.innerWidth < 768 ? 280 : 500;
      console.log('Animation not complete, using initial height:', initialHeight);
      return initialHeight;
    }

    console.log('Using current intro height:', introState.currentHeight);
    return introState.currentHeight;
  };

  const hashLinks = navbar?.querySelectorAll('a[href^="/#"]');
  console.log('Found hash links:', hashLinks?.length);

  if (hashLinks && hashLinks.length > 0) {
    hashLinks.forEach((link) => {
      // Create button element and copy attributes/styling from link
      const button = document.createElement('button');
      button.textContent = link.textContent;
      button.className = link.className;
      button.setAttribute('data-href', link.getAttribute('href') || '');

      // Replace link with button
      link.parentNode?.replaceChild(button, link);

      button.addEventListener('click', () => {
        const href = button.getAttribute('data-href');
        console.log('Button clicked:', href);

        if (!href) {
          console.log('No href found on button');
          return;
        }

        if (window.location.pathname !== '/') {
          console.log('Not on homepage, redirecting to:', href);
          window.location.href = href;
          return;
        }

        const hash = href.replace('/', '');
        const element = document.querySelector(hash);
        console.log('Target element:', {
          hash,
          elementFound: !!element,
          element,
        });

        if (!element) return;

        const navHeight = navbar?.getBoundingClientRect().height || 0;
        const elementPosition = (element as HTMLElement).offsetTop;
        const introOffset = elementPosition < getIntroOffset() ? 0 : getIntroOffset();

        console.log('Scroll calculations:', {
          navHeight,
          elementPosition,
          introOffset,
          windowScrollY: window.scrollY,
          elementBoundingRect: element.getBoundingClientRect(),
          elementOffsetTop: (element as HTMLElement).offsetTop,
          elementOffsetParent: (element as HTMLElement).offsetParent,
        });

        const scrollTo = elementPosition - navHeight;
        console.log('Final scroll position:', scrollTo);

        window.scrollTo({
          top: scrollTo,
          behavior: 'instant',
        });
      });
    });
  }
};

const initNav = () => {
  animateNavLogo();
  getMobileMenu();
  handleHashLinkNavigation();
  navMenuPosition();
};

export { animateNavLogo, getMobileMenu, initNav, navMenuPosition };
