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
  getViewportHeightMeasurements,
  isMobile
} from "./chunk-UQEN3MJC.js";
import "./chunk-JG2TWXUP.js";

// src/pages/home/sections/competition-dates.ts
var SELECTORS = {
  image: '[date-element="image"]',
  info: '[date-element="information"]',
  stickyImage: ".date_sticky-image"
};
var ANIMATION_CONFIG = {
  rotationRange: [-5, 5],
  duration: 0.4,
  ease: "power2.out"
};
var updateStickyImageTop = () => {
  try {
    const stickyImages = document.querySelectorAll(SELECTORS.stickyImage);
    if (!stickyImages.length) {
      console.error("No sticky images found to update positions");
      return;
    }
    const { fullHeight } = getViewportHeightMeasurements();
    stickyImages.forEach((stickyImage) => {
      const imageChild = stickyImage.firstElementChild;
      if (!imageChild) {
        console.error("Sticky image container has no child element");
        return;
      }
      const imageHeight = imageChild.getBoundingClientRect().height;
      const topOffset = (fullHeight - imageHeight) / 2;
      stickyImage.style.top = `${topOffset}px`;
    });
  } catch (error) {
    console.error("Error updating sticky image positions:", error);
  }
};
var setupElementAnimations = (img, info, index) => {
  const getRandomRotation = () => {
    const [min, max] = ANIMATION_CONFIG.rotationRange;
    return Math.random() * (max - min) + min;
  };
  const rotationDirection = index % 2 === 0 ? 1 : -1;
  const randomRotation = getRandomRotation() * rotationDirection;
  gsapWithCSS.set(img, { opacity: 0, rotation: -randomRotation, scale: 0.9 });
  gsapWithCSS.set(info, { opacity: 0, x: -20 });
  const tl = gsapWithCSS.timeline({
    scrollTrigger: {
      trigger: img,
      start: "top 50%",
      end: "bottom 30%",
      toggleActions: "play none none reverse",
      id: `competitionDatesAnimation${index}`
      //   markers: true,
    }
  });
  tl.to(
    img,
    {
      opacity: 1,
      rotation: randomRotation,
      scale: 1,
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease
    },
    "<"
  ).to(
    info,
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease
    },
    "<"
  );
};
var competitionDates = () => {
  try {
    if (isMobile()) {
      return () => {
      };
    }
    const reinitialize = () => {
      ScrollTrigger.getById("competitionDatesAnimation0")?.kill();
      const images = document.querySelectorAll(SELECTORS.image);
      const info = document.querySelectorAll(SELECTORS.info);
      if (!images.length || !info.length) {
        console.error("Required competition dates elements not found during reinitialization");
        return;
      }
      updateStickyImageTop();
      images.forEach((img, index) => {
        const correspondingInfo = info[index];
        if (correspondingInfo) {
          setupElementAnimations(img, correspondingInfo, index);
        }
      });
    };
    gsapWithCSS.registerPlugin(ScrollTrigger);
    reinitialize();
    handleResize(reinitialize, 100, {
      widthOnly: true,
      threshold: 10
    });
    return () => {
      ScrollTrigger.getById("competitionDatesAnimation0")?.kill();
    };
  } catch (error) {
    console.error("Error initializing competition dates:", error);
    return () => {
    };
  }
};
var initCompetitionDates = () => {
  competitionDates();
};
export {
  initCompetitionDates
};
//# sourceMappingURL=competition-dates-7IU4T2GJ.js.map
