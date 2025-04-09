import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const parallaxBackground = () => {
  const SELECTORS = {
    BG_ELEMENT: '[custom-action="parallax-bg"]',
  };
  const parallaxBg = document.querySelectorAll(SELECTORS.BG_ELEMENT) as NodeListOf<HTMLElement>;

  if (parallaxBg.length === 0) {
    console.error(`No parallax bg elements found, set using: ${SELECTORS.BG_ELEMENT}`);
    return;
  }

  Array.from(parallaxBg).forEach((bg, index) => {
    const parent = bg.parentElement;

    if (!parent) {
      console.error(`${bg.id} has no parent element`);
      return;
    }

    // Create smooth parallax effect
    gsap.fromTo(
      parallaxBg,
      {
        yPercent: -20, // Move up by 15% of its height
      },
      {
        yPercent: 20, // Move down by 15% of its height
        ease: 'none',
        scrollTrigger: {
          trigger: parent,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
          id: `parallax-bg-${index}`,
        },
      }
    );

    return () => {
      ScrollTrigger.getById('parallax-bg-1')?.kill();
    };
  });
};
