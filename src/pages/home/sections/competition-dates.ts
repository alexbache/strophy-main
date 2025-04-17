import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getViewportHeightMeasurements, isMobile } from '../../../utils/page-utils';

const SELECTORS = {
  image: '[date-element="image"]',
  info: '[date-element="information"]',
  stickyImage: '.date_sticky-image',
} as const;

const ANIMATION_CONFIG = {
  rotationRange: [-5, 5] as const,
  duration: 0.4,
  ease: 'power2.out',
} as const;

const updateStickyImageTop = () => {
  try {
    const stickyImages = document.querySelectorAll<HTMLElement>(SELECTORS.stickyImage);
    if (!stickyImages.length) {
      console.error('No sticky images found to update positions');
      return;
    }
    const { fullHeight } = getViewportHeightMeasurements();
    // console.log('Viewport height:', fullHeight);
    stickyImages.forEach((stickyImage) => {
      const imageChild = stickyImage.firstElementChild;
      if (!imageChild) {
        console.error('Sticky image container has no child element');
        return;
      }
      const imageHeight = imageChild.getBoundingClientRect().height;
      const topOffset = (fullHeight - imageHeight) / 2;
      // Apply the new position
      stickyImage.style.top = `${topOffset}px`;
      // Log for debugging
      //   console.log(`Sticky image ${index} updated: height=${imageHeight}, top=${topOffset}px`);
    });
  } catch (error) {
    console.error('Error updating sticky image positions:', error);
  }
};

const setupElementAnimations = (img: Element, info: Element, index: number) => {
  const getRandomRotation = () => {
    const [min, max] = ANIMATION_CONFIG.rotationRange;
    return Math.random() * (max - min) + min;
  };

  const rotationDirection = index % 2 === 0 ? 1 : -1;
  const randomRotation = getRandomRotation() * rotationDirection;

  // Set initial states
  gsap.set(img, { opacity: 0, rotation: -randomRotation, scale: 0.9 });
  gsap.set(info, { opacity: 0, x: -20 });

  // Create timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: img,
      start: 'top 50%',
      end: 'bottom 30%',
      toggleActions: 'play none none reverse',
      id: `competitionDatesAnimation${index}`,
      //   markers: true,
    },
  });

  // Add animations to timeline
  tl.to(
    img,
    {
      opacity: 1,
      rotation: randomRotation,
      scale: 1,
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease,
    },
    '<'
  ).to(
    info,
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease,
    },
    '<'
  );
};

const competitionDates = () => {
  try {
    // Check if we're on mobile - if so, don't set up animations
    if (isMobile()) {
      return () => {}; // Return empty cleanup function
    }

    // Function to completely reinitialize everything
    const reinitialize = () => {
      // Kill all existing ScrollTrigger instances
      ScrollTrigger.getById('competitionDatesAnimation0')?.kill();

      // Get fresh references to elements
      const images = document.querySelectorAll(SELECTORS.image);
      const info = document.querySelectorAll(SELECTORS.info);

      if (!images.length || !info.length) {
        console.error('Required competition dates elements not found during reinitialization');
        return;
      }

      // Update sticky positions
      updateStickyImageTop();

      // Set up animations
      images.forEach((img, index) => {
        const correspondingInfo = info[index];
        if (correspondingInfo) {
          setupElementAnimations(img, correspondingInfo, index);
        }
      });
    };

    // Initial setup
    gsap.registerPlugin(ScrollTrigger);
    reinitialize();

    // Handle resize events with debouncing
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Completely reinitialize everything
        reinitialize();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getById('competitionDatesAnimation0')?.kill();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  } catch (error) {
    console.error('Error initializing competition dates:', error);
    return () => {}; // Return empty cleanup function on error
  }
};

const initCompetitionDates = () => {
  competitionDates();
};

export { initCompetitionDates };
