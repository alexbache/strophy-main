import "./chunks/chunk-CIFVEASM.js";
import {
  setEndState
} from "./chunks/chunk-LRAIBFHB.js";
import {
  ScrollTrigger
} from "./chunks/chunk-G4OS44JP.js";
import {
  LogoMarquee
} from "./chunks/chunk-7KWVT67H.js";
import {
  handleResize
} from "./chunks/chunk-TLP63QE5.js";
import {
  isPage
} from "./chunks/chunk-ISCHIRRL.js";
import {
  initPhaseControl
} from "./chunks/chunk-F5B76DJG.js";
import {
  gsapWithCSS
} from "./chunks/chunk-6KMKHOBV.js";
import {
  BREAKPOINTS,
  isDesktop
} from "./chunks/chunk-UQEN3MJC.js";
import "./chunks/chunk-JG2TWXUP.js";

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
          stopPageScroll(isOpen);
        }
      });
    });
    observer.observe(menuElement, {
      attributes: true,
      attributeFilter: ["style"]
    });
  }
  if (shouldStop) {
    const { scrollY } = window;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    html.style.scrollBehavior = "auto";
  } else {
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    html.style.scrollBehavior = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }
  return () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };
};

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

// src/components/nav.ts
var animateNavLogo = (debug = false) => {
  const SELECTORS3 = {
    logo: ".navbar_logo"
  };
  const logo = document.querySelector(SELECTORS3.logo);
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
var handleMobileMenuOpen = () => {
  const { mobileMenu } = getMobileMenu();
  if (!mobileMenu) {
    console.error("Required mobile menu element not found");
    return;
  }
  if (!isDesktop()) {
    return stopPageScroll(false, mobileMenu);
  }
};
var initNav = () => {
  animateNavLogo();
  getMobileMenu();
  handleHashLinkNavigation();
  navMenuPosition();
  handleMobileMenuOpen();
};

// src/components/contact-modal.ts
var SELECTORS2 = {
  CONTACT_MODAL: "#contact-modal",
  CONTACT_MODAL_OPEN: '[contact-modal-action="open"]',
  CONTACT_MODAL_CLOSE: '[contact-modal-action="close"]'
};
var initContactModal = () => {
  const contactModalOpenButtons = document.querySelectorAll(SELECTORS2.CONTACT_MODAL_OPEN);
  const contactModalCloseButtons = document.querySelectorAll(SELECTORS2.CONTACT_MODAL_CLOSE);
  const contactModal = document.querySelector(SELECTORS2.CONTACT_MODAL);
  if (contactModalOpenButtons.length === 0 || contactModalCloseButtons.length === 0 || !contactModal) {
    console.error(
      "missing elements",
      "contactModalOpenButtons",
      contactModalOpenButtons,
      "contactModalCloseButtons",
      contactModalCloseButtons,
      "contactModal",
      contactModal
    );
  }
  const openModal = () => {
    contactModal.style.display = "block";
  };
  const closeModal = () => {
    contactModal.style.display = "none";
    const { mobileMenu } = getMobileMenu();
    if (mobileMenu.style.display === "block") {
      mobileMenu.style.display = "none";
    }
  };
  contactModalOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("stopping page scroll - contact modal open");
      stopPageScroll(true);
      openModal();
    });
  });
  contactModalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      stopPageScroll(false);
      closeModal();
    });
  });
};

// src/components/footer.ts
var initFooter = () => {
  LogoMarquee();
};

// src/integrations/klaviyo-forms/klaviyo-styling.ts
var initKlaviyoStyling = () => {
  const klaviyoForms = document.querySelectorAll('[data-form="klaviyo"]');
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const formRows = mutation.target.querySelectorAll(
        '[data-testid="form-row"]'
      );
      formRows.forEach((formRow) => {
        if (formRow.children.length === 2) {
          formRow.classList.add("stacked-form");
        }
      });
      const formLinks = mutation.target.querySelectorAll(
        "a"
      );
      formLinks.forEach((formLink) => {
        formLink.setAttribute("target", "_blank");
      });
    });
  });
  klaviyoForms.forEach((form) => {
    mutationObserver.observe(form, {
      childList: true,
      subtree: true
    });
  });
};

// src/utils/handle-external-links.ts
var handleExternalLinks = () => {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && (href.startsWith("http") || href.startsWith("https") || href.includes("://") && !href.includes(window.location.hostname))) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
};

// src/index.ts
if (isPage("/")) {
  import("./chunks/hero-images-marquee-HJ4DPCTO.js");
}
window.Webflow ||= [];
window.Webflow.push(async () => {
  initKlaviyoStyling();
  initNav();
  initPhaseControl();
  initContactModal();
  handleExternalLinks();
  initFooter();
  if (isPage(["/entries/*", "/winners/*"])) {
    const [{ setPagePageTopPadding }, { entryCMSItemPage }] = await Promise.all([
      import("./chunks/page-utils-IYEIJEPU.js"),
      import("./chunks/entry-cms-item-page-WCMKPWWH.js")
    ]);
    setPagePageTopPadding();
    entryCMSItemPage();
  }
  if (isPage(["/entries"])) {
    const [
      { initSectionRenderer },
      { initFeaturedEntriesLimit },
      { initWinnerItemPosition },
      { initFilters },
      { initSwiper }
    ] = await Promise.all([
      import("./chunks/section-renderer-7TT5QQDG.js"),
      import("./chunks/featured-entries-limit-FXVHZ3F3.js"),
      import("./chunks/winners-4SLZKJEN.js"),
      import("./chunks/filters-JN7S33RO.js"),
      import("./chunks/image-swipers-DIODCSD2.js")
    ]);
    initSectionRenderer();
    initFeaturedEntriesLimit();
    initWinnerItemPosition();
    initFilters();
    initSwiper("featured-entries");
  }
  if (isPage("/")) {
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
      { default: initCategoriesAnimation }
    ] = await Promise.all([
      import("./chunks/hero-images-marquee-HJ4DPCTO.js"),
      import("./chunks/hero-text-marquee-NTRBWJSA.js"),
      import("./chunks/intro-scene-EDIFB7FS.js"),
      import("./chunks/image-marquee-SQSNBWMO.js"),
      import("./chunks/cash-prizes-6V4JNYTI.js"),
      import("./chunks/parallax-bg-KZBPDY4S.js"),
      import("./chunks/email-signup-section-UFGLJIG4.js"),
      import("./chunks/competition-dates-7IU4T2GJ.js"),
      import("./chunks/categories-EQDADREA.js"),
      import("./chunks/inspiration-HQYBWKIY.js"),
      import("./chunks/filters-JN7S33RO.js"),
      import("./chunks/categories-animation-5A3B5VEE.js")
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
  if (isPage("/thank-you")) {
    const { initThankYou } = await import("./chunks/thank-you-374UP7CM.js");
    initThankYou();
  }
});
window.Webflow.push(async () => {
});
//# sourceMappingURL=index.js.map
