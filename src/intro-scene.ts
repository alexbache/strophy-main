import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

import { isMobile } from './utils/pageUtils';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

export const introAnimation = () => {
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
      y: 30, // Reduced movement for smoother fade
    });

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingWrap,
        start: 'top 55%',
        end: 'bottom 15%',
        scrub: 3,
        // markers: true,
        toggleActions: 'play reverse play reverse',
        id: 'introAnimation', // Add unique identifier
      },
    });

    tl.to(headingWrap, {
      height: isMobile() ? 280 : 500,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    }).to(heading, {
      opacity: 1,
      y: 0,
      duration: 3.5,
      ease: 'power2.out',
      scrub: 3,
      text: {
        value: headingText,
        oldClass: 'heading-style-intro-muted',
        newClass: 'heading-style-intro',
      },
    });

    ScrollTrigger.refresh();
  };

  // Initial call
  initAnimation();

  // Add resize listener
  window.addEventListener('resize', initAnimation);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', initAnimation);
    ScrollTrigger.getAll()
      .filter((trigger) => trigger.vars.id === 'introAnimation')
      .forEach((trigger) => trigger.kill());
  };
};
