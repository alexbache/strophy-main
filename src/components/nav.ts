import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { handleHashLinkNavigation } from '$utils/handle-hash-link-navigation';
import { handleResize } from '$utils/handle-resize';
import { isDesktop } from '$utils/page-utils';
import { isMobile } from '$utils/page-utils';
import { BREAKPOINTS } from '$utils/page-utils';
import { stopPageScroll } from '$utils/stop-page-scroll';

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
  navbar: '#navbar',
};

const getMobileMenu = () => {
  const banner = document.querySelector(SELECTORS.banner) as HTMLElement;
  const mobileMenu = document.querySelector(SELECTORS.mobileMenu) as HTMLElement;
  const navbar = document.querySelector(SELECTORS.navbar) as HTMLElement;
  return { banner, mobileMenu, navbar };
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
  handleResize(setPadding, 100, {
    widthOnly: true,
    threshold: 10,
  });
};

const handleMobileMenuOpen = () => {
  const { mobileMenu } = getMobileMenu();
  if (!mobileMenu) {
    console.error('Required mobile menu element not found');
    return;
  }

  if (!isDesktop()) {
    return stopPageScroll(false, mobileMenu);
  }
};

const handleMobileNavAppear = () => {
  const { navbar } = getMobileMenu();
  if (!navbar) {
    console.error('Required navbar element not found');
    return;
  }

  let lastScrollY = window.scrollY;
  let isVisible = true;

  // GSAP timeline for nav animations
  const navTimeline = gsap.timeline({ paused: true });
  navTimeline
    .to(navbar, {
      yPercent: 0,
      duration: 0.3,
      ease: 'power3.inOut',
    })
    .to(
      navbar,
      {
        yPercent: -100,
        duration: 0.3,
        ease: 'power3.inOut',
      },
      '>'
    );

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Determine scroll direction
    if (currentScrollY > lastScrollY && isVisible) {
      // Scrolling down - hide nav
      navTimeline.play();
      isVisible = false;
    } else if (currentScrollY < lastScrollY && !isVisible) {
      // Scrolling up - show nav
      navTimeline.reverse();
      isVisible = true;
    }

    lastScrollY = currentScrollY;
  };

  // Add scroll listener with throttle
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
};

const initNav = () => {
  animateNavLogo();
  getMobileMenu();
  handleHashLinkNavigation();
  navMenuPosition();
  handleMobileMenuOpen();
  if (isMobile()) {
    handleMobileNavAppear();
  }
};

export { animateNavLogo, getMobileMenu, initNav, navMenuPosition };
