import { gsap } from 'gsap';

import { handleResize } from '$utils/handle-resize';

import { isTablet } from '../../../utils/page-utils';

const heroImageMarquee = () => {
  const SELECTORS = {
    marqueeLeft: '.intro-marquee.marquee-left',
    marqueeRight: '.intro-marquee.marquee-right',
  };

  try {
    const marqueeRows = document.querySelectorAll('[marquee-element="img-list-wrapper"]');

    if (!marqueeRows || marqueeRows.length === 0) {
      console.error(
        'No marquee rows found. Please check that elements with marquee-element="img-list-wrapper" exist.'
      );
    }

    // console.log(`Found ${marqueeRows.length} marquee rows`);

    marqueeRows.forEach((row, index) => {
      try {
        // console.log(`Cloning row ${index + 1}`);
        const clone = row.cloneNode(true);
        if (!row.parentNode) {
          console.error(`Parent node not found for row ${index + 1}`);
          return;
        }
        row.parentNode.appendChild(clone);
      } catch (err) {
        console.error(`Error cloning row ${index + 1}:`, err);
      }
    });
  } catch (err) {
    console.error('Error in heroImageMarquee:', err);
  }

  // Set up GSAP animations for left and right marquees
  const leftMarquees = document.querySelectorAll(SELECTORS.marqueeLeft);
  const rightMarquees = document.querySelectorAll(SELECTORS.marqueeRight);

  if (!leftMarquees.length || !rightMarquees.length) {
    console.error('Marquee elements not found');
    return;
  }

  // Animate left marquees
  leftMarquees.forEach((marquee) => {
    gsap.fromTo(
      marquee,
      {
        xPercent: 0,
      },
      {
        xPercent: -50,
        ease: 'none',
        duration: 40,
        repeat: -1,
      }
    );
  });

  // Animate right marquees
  rightMarquees.forEach((marquee) => {
    gsap.fromTo(
      marquee,
      {
        xPercent: -50,
      },
      {
        xPercent: 0,
        ease: 'none',
        duration: 40,
        repeat: -1,
      }
    );
  });
};

const LogoMarquee = () => {
  const initMarquee = () => {
    try {
      //   console.log('Initializing hero logo marquee');
      const SELECTORS = {
        marqueeRowInner: '[logo-marquee-element="inner-row"]',
        marqueeRow: '[logo-marquee-element="outer-row"]',
      };

      const marqueeRows = document.querySelectorAll(SELECTORS.marqueeRow);
      const marqueeRowInners = document.querySelectorAll(SELECTORS.marqueeRowInner);

      // Handle desktop view
      if (!isTablet()) {
        // console.log('Desktop view detected - removing clones and resetting positions');
        marqueeRows.forEach((marqueeRow) => {
          const clonedElement = marqueeRow.querySelector('[data-clone="true"]');
          if (clonedElement) {
            try {
              clonedElement.remove();
            } catch (err) {
              console.error('Error removing cloned element:', err);
            }
          }

          gsap.killTweensOf(`${SELECTORS.marqueeRow} > *`);

          // Reset positions
          try {
            Array.from(marqueeRow.children).forEach((row) => {
              gsap.set(row, {
                xPercent: 0,
              });
            });
          } catch (err) {
            console.error('Error resetting row positions:', err);
          }
        });
        return;
      }

      if (!marqueeRows.length || !marqueeRowInners.length) {
        console.error(
          'No marquee rows found. Please check that elements with marquee-element="logo-list-wrapper" exist.',
          {
            marqueeRows,
            marqueeRowInners,
          }
        );
        throw new Error('Marquee rows not found');
      }

      // Create mobile marquee effect for each row
      marqueeRows.forEach((marqueeRow, index) => {
        const marqueeRowInner = marqueeRowInners[index];
        const clonedElement = marqueeRow.querySelector('[data-clone="true"]');

        if (isTablet() && !clonedElement) {
          try {
            const marqueeRowInnerClone = marqueeRowInner.cloneNode(true) as HTMLElement;
            marqueeRowInnerClone.setAttribute('data-clone', 'true');
            marqueeRow.appendChild(marqueeRowInnerClone);

            // Create GSAP animation for each row
            Array.from(marqueeRow.children).forEach((row) => {
              gsap.to(row, {
                xPercent: -100,
                ease: 'none',
                duration: 20,
                repeat: -1,
              });
            });
          } catch (err) {
            console.error('Error creating mobile marquee effect:', err);
          }
        }
      });
    } catch (err) {
      console.error('Error in initMarquee:', err);
    }
  };

  // Initial call
  try {
    initMarquee();
  } catch (err) {
    console.error('Error during initial marquee setup:', err);
  }

  // Add resize listener
  handleResize(initMarquee, 100, {
    widthOnly: true,
    threshold: 10,
  });
};

const initHeroMarquee = () => {
  heroImageMarquee();
  LogoMarquee();
};

export { initHeroMarquee, LogoMarquee };
