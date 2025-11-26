import './logo-marquee.css';

import { handleResize } from '$utils/handle-resize';

import { isTablet } from '../../utils/page-utils';

/**
 * Logo Marquee
 *
 * On desktop: Static logos (no cloning, no animation)
 * On tablet/mobile: Clones marquee content for seamless infinite scrolling.
 * Animation is handled purely by CSS (see logo-marquee.css).
 */
export const initLogoMarquee = () => {
  const initMarquee = () => {
    const marqueeRows = document.querySelectorAll('[logo-marquee-element="outer-row"]');
    const marqueeRowInners = document.querySelectorAll('[logo-marquee-element="inner-row"]');

    if (!marqueeRows.length || !marqueeRowInners.length) return;

    marqueeRows.forEach((marqueeRow, index) => {
      const marqueeRowInner = marqueeRowInners[index];
      if (!marqueeRowInner) return;

      const clonedElement = marqueeRow.querySelector('[data-clone="true"]');

      if (isTablet()) {
        // Tablet/Mobile: Clone the inner row if it doesn't exist
        if (!clonedElement) {
          const clone = marqueeRowInner.cloneNode(true) as HTMLElement;
          clone.setAttribute('data-clone', 'true');
          marqueeRow.appendChild(clone);
        }
      } else {
        // Desktop: Remove clone if it exists
        if (clonedElement) {
          clonedElement.remove();
        }
      }
    });
  };

  // Initial call
  initMarquee();

  // Add resize listener
  handleResize(initMarquee, 100, {
    widthOnly: true,
    threshold: 10,
  });
};
