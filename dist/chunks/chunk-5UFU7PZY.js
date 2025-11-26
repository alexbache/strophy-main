import {
  isPage
} from "./chunk-ISCHIRRL.js";
import {
  setEndState
} from "./chunk-LRAIBFHB.js";
import {
  ScrollTrigger
} from "./chunk-G4OS44JP.js";
import {
  handleResize
} from "./chunk-TLP63QE5.js";
import {
  gsapWithCSS
} from "./chunk-6KMKHOBV.js";
import {
  BREAKPOINTS,
  isDesktop
} from "./chunk-UQEN3MJC.js";

// src/utils/handle-hash-link-navigation.ts
var handleHashLinkNavigation = () => {
  const navbar = document.querySelector("#navbar");
  const hashLinks = navbar?.querySelectorAll('a[href^="/#"]');
  if (hashLinks && hashLinks.length > 0) {
    hashLinks.forEach((link) => {
      const button = document.createElement("button");
      button.textContent = link.textContent;
      button.className = link.className;
      button.setAttribute("data-href", link.getAttribute("href") || "");
      link.parentNode?.replaceChild(button, link);
      button.addEventListener("click", (event) => {
        event.preventDefault();
        setEndState();
        const href = button.getAttribute("data-href");
        if (!href) {
          return;
        }
        if (window.location.pathname !== "/") {
          window.location.href = href;
          return;
        }
        const hash = href.replace("/", "");
        const element = document.querySelector(hash);
        if (!element) return;
        const navHeight = navbar?.getBoundingClientRect().height || 0;
        const elementPosition = element.offsetTop;
        const scrollTo = elementPosition - navHeight;
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth"
        });
      });
    });
  }
};

// src/utils/stop-page-scroll.ts
var observer = null;
var stopPageScroll = (shouldStop, menuElement) => {
  const { body } = document;
  const html = document.documentElement;
  if (menuElement && !observer) {
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "style") {
          const isOpen = menuElement.style.display !== "none";
          if (isOpen) {
            stopPageScroll(true);
          } else {
            stopPageScroll(false);
          }
        }
      });
    });
    observer.observe(menuElement, {
      attributes: true,
      attributeFilter: ["style"]
    });
  }
  if (shouldStop) {
    if (body.style.position !== "fixed") {
      const { scrollY } = window;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
      html.style.scrollBehavior = "auto";
    }
  } else {
    if (body.style.position === "fixed") {
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      html.style.scrollBehavior = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }
  return () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };
};

// src/components/nav.ts
var animateNavLogo = (debug = false) => {
  const SELECTORS2 = {
    logo: ".navbar_logo"
  };
  const logo = document.querySelector(SELECTORS2.logo);
  if (!logo) {
    console.error("Required logo element not found");
    return;
  }
  gsapWithCSS.registerPlugin(ScrollTrigger);
  const isHomepage = isPage("/");
  const initAnimation = () => {
    gsapWithCSS.set(logo, {
      y: isHomepage ? -100 : 0,
      opacity: 0
    });
    if (isHomepage) {
      const tl = gsapWithCSS.timeline({
        scrollTrigger: {
          trigger: "main",
          start: "4% top",
          end: "top 0%",
          scrub: false,
          toggleActions: "play none none reverse",
          id: "navLogoAnimation",
          immediateRender: true,
          markers: debug
          // onEnter: () => console.log('ScrollTrigger entered'),
          // onLeave: () => console.log('ScrollTrigger left'),
        }
      });
      tl.to(logo, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out"
      });
      ScrollTrigger.refresh();
    } else {
      gsapWithCSS.to(logo, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };
  initAnimation();
  return () => {
    ScrollTrigger.getById("navLogoAnimation")?.kill();
  };
};
var SELECTORS = {
  banner: "#nav-mobile-banner",
  mobileMenu: "#nav-mobile-menu",
  navbar: "#navbar"
};
var getMobileMenu = () => {
  const banner = document.querySelector(SELECTORS.banner);
  const mobileMenu = document.querySelector(SELECTORS.mobileMenu);
  const navbar = document.querySelector(SELECTORS.navbar);
  return { banner, mobileMenu, navbar };
};
var navMenuPosition = () => {
  if (window.innerWidth >= BREAKPOINTS.TABLET) {
    return () => {
    };
  }
  const { banner, mobileMenu } = getMobileMenu();
  if (!banner || !mobileMenu) {
    console.error("Required banner or mobile menu element not found", {
      banner: banner ? "found" : "missing",
      mobileMenu: mobileMenu ? "found" : "missing"
    });
    return;
  }
  const setPadding = () => {
    if (window.innerWidth < BREAKPOINTS.TABLET) {
      const bannerHeight = banner.getBoundingClientRect().height;
      const newPadding = `${bannerHeight}px`;
      mobileMenu.style.paddingTop = newPadding;
    }
  };
  setTimeout(() => {
    setPadding();
  }, 500);
  handleResize(setPadding, 100, {
    widthOnly: true,
    threshold: 10
  });
};
var cleanupScrollLock;
var handleMobileMenuOpen = () => {
  const { mobileMenu } = getMobileMenu();
  if (!mobileMenu) {
    console.error("Required mobile menu element not found");
    return;
  }
  if (cleanupScrollLock) {
    cleanupScrollLock();
    cleanupScrollLock = void 0;
  }
  if (!isDesktop()) {
    cleanupScrollLock = stopPageScroll(false, mobileMenu);
  }
  const cleanupResize = handleResize(
    () => {
      if (isDesktop() && cleanupScrollLock) {
        stopPageScroll(false);
        cleanupScrollLock();
        cleanupScrollLock = void 0;
      } else if (!isDesktop() && !cleanupScrollLock) {
        cleanupScrollLock = stopPageScroll(false, mobileMenu);
      }
    },
    100,
    {
      widthOnly: true,
      threshold: 10
    }
  );
  return () => {
    if (cleanupScrollLock) {
      cleanupScrollLock();
    }
    if (cleanupResize) {
      cleanupResize();
    }
  };
};
var initNav = () => {
  animateNavLogo();
  getMobileMenu();
  handleHashLinkNavigation();
  navMenuPosition();
  handleMobileMenuOpen();
};

export {
  stopPageScroll,
  animateNavLogo,
  getMobileMenu,
  navMenuPosition,
  initNav
};
//# sourceMappingURL=chunk-5UFU7PZY.js.map
