import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

import { isMobile } from '../../../utils/page-utils';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

const introState = {
  isAnimationComplete: false,
  currentHeight: 0,
};

const introAnimation = () => {
  const SELECTORS = {
    headingWrap: '#intro-heading-wrap',
    heading: '#intro-heading',
  };

  const headingWrap = document.querySelector(SELECTORS.headingWrap);
  const heading = document.querySelector(SELECTORS.heading);
  const headingText = heading?.textContent || '';

  if (!headingWrap || !heading) {
    console.error('Required intro elements not found');
    return;
  }

  const initAnimation = () => {
    // Reset state when animation starts
    introState.isAnimationComplete = false;
    introState.currentHeight = isMobile() ? 4 : 10;

    // Instead of killing all ScrollTriggers, only kill this specific one
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.vars.id === 'introAnimation')
      .forEach((trigger) => trigger.kill());

    // Set initial states
    gsap.set(headingWrap, {
      height: isMobile() ? 4 : 10,
      opacity: 0,
    });

    gsap.set(heading, {
      display: 'block',
      opacity: 0,
      //   y: 30, // Reduced movement for smoother fade
    });

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingWrap,
        start: 'top 70%',
        end: 'bottom 20%',
        // scrub: 1,
        toggleActions: 'play none none none',
        id: 'introAnimation', // Add unique identifier
      },
    });

    tl.to(headingWrap, {
      height: isMobile() ? 280 : 500,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        // Update current height during animation
        introState.currentHeight = (headingWrap as HTMLElement).offsetHeight;
      },
    }).to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        ScrollTrigger.refresh();
        introState.isAnimationComplete = true;
      },
      text: {
        value: headingText,
        oldClass: 'heading-style-intro-muted',
        newClass: 'heading-style-intro',
      },
    });

    // ScrollTrigger.refresh();
  };

  // Initial call
  initAnimation();

  // Cleanup function
  return () => {
    window.removeEventListener('resize', initAnimation);
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.vars.id === 'introAnimation')
      .forEach((trigger) => trigger.kill());
  };
};

const initIntroAnimation = () => {
  introAnimation();
};

const setEndState = () => {
  const headingWrap = document.querySelector('#intro-heading-wrap');
  const heading = document.querySelector('#intro-heading');
  if (headingWrap && heading) {
    gsap.set(headingWrap, {
      height: isMobile() ? 280 : 500,
      opacity: 1,
    });
    gsap.set(heading, {
      opacity: 1,
    });
  }
};

export { initIntroAnimation, introState, setEndState };
