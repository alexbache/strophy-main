import './hero-images-marquee.css';

import { gsap } from 'gsap';

import { handleResize } from '$utils/handle-resize';

import { isTablet } from '../../../../utils/page-utils';

/**
 * Hero Image Marquee
 *
 * Clones marquee content for rows that need JS duplication (due to Webflow CMS limits).
 * Rows with data-marquee-clone="needed" will have their content duplicated.
 * Animation is handled purely by CSS (see hero-marquee.css).
 */
const heroImageMarquee = () => {
  const heroSection = document.querySelector("[data-section='hero']");
  if (!heroSection) {
    console.error('Hero section not found, make sure [data-section="hero"] exists');
    return;
  }

  // Find rows that need JS cloning (bottom 3 rows that hit CMS limit)
  const marqueeRowsNeedingClone = heroSection.querySelectorAll('[data-marquee-clone="true"]');

  if (!marqueeRowsNeedingClone.length) {
    console.error('No rows needing clone found, make sure [data-marquee-clone="true"] exists');
    return;
  }

  // Clone content for seamless infinite scroll
  marqueeRowsNeedingClone.forEach((row: Element) => {
    const clone = row.cloneNode(true) as HTMLElement;
    row.parentElement?.appendChild(clone);
  });

  // CSS animations (.intro-marquee.marquee-left / .marquee-right) handle the rest
};

const heroIntroAnimation = () => {
  try {
    console.log('🎬 [Hero Animation] Starting hero intro animation');

    const heroSection = document.querySelector("[data-section='hero']");
    if (!heroSection) {
      console.error('❌ [Hero Animation] Hero section not found for intro animation');
      return;
    }

    console.log('✅ [Hero Animation] Hero section found');

    // Elements to fade in
    // const heading = heroSection.querySelector('[data-fade-in="heading"]');

    const logoCloud = heroSection.querySelector('[data-fade-in="logo-cloud"]');
    const textMarquee = heroSection.querySelector('[data-fade-in="text-marquee"]');
    const imageMarqueeRows = heroSection.querySelectorAll('[data-fade-in="image-marquee-row"]');

    console.log('📦 [Hero Animation] Elements found:', {
      // heading: !!heading,
      logoCloud: !!logoCloud,
      textMarquee: !!textMarquee,
      imageMarqueeRows: imageMarqueeRows.length,
    });

    // Loaders/overlays
    // const headingLoader = document.querySelector('.hero-heading-loader');
    const logoCloudLoader = document.querySelector('.hero-logo-cloud-loader');
    const textMarqueeLoader = document.querySelector('.hero-text-marquee-loader');
    const imageMarqueeLoader = document.querySelector('.hero-image-marquee-loader');

    console.log('🎭 [Hero Animation] Loaders found:', {
      // headingLoader: !!headingLoader,
      logoCloudLoader: !!logoCloudLoader,
      textMarqueeLoader: !!textMarqueeLoader,
      imageMarqueeLoader: !!imageMarqueeLoader,
    });

    // Set initial state (hidden)
    gsap.set([logoCloud, textMarquee, imageMarqueeRows], { opacity: 0, y: 20 });
    console.log('🎨 [Hero Animation] Initial states set (opacity: 0, y: 20)');

    // PHASE 1: Immediate reveal (don't wait for images)
    console.log('🚀 [Hero Animation] PHASE 1: Starting immediate reveal (logo cloud)');
    const tl = gsap.timeline({ delay: 0 });

    // // Fade in heading and fade out its loader simultaneously
    // tl.to(
    //   heading,
    //   {
    //     opacity: 1,
    //     y: 0,
    //     duration: 0.5,
    //     ease: 'power2.out',
    //     onStart: () => console.log('  ⏳ Fading in heading'),
    //     onComplete: () => console.log('  ✅ Heading visible'),
    //   },
    //   0
    // ).to(
    //   headingLoader,
    //   {
    //     opacity: 0,
    //     duration: 0.5,
    //     ease: 'power2.out',
    //     onComplete: () => {
    //       console.log('  ✅ Heading loader hidden');
    //       if (headingLoader) (headingLoader as HTMLElement).style.display = 'none';
    //     },
    //   },
    //   0
    // );

    // Fade in logo cloud and fade out its loader simultaneously
    tl.to(
      logoCloud,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        onStart: () => console.log('  ⏳ Fading in logo cloud'),
        onComplete: () => console.log('  ✅ Logo cloud visible'),
      },
      0
    ).to(
      logoCloudLoader,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          console.log('  ✅ Logo cloud loader hidden');
          if (logoCloudLoader) (logoCloudLoader as HTMLElement).style.display = 'none';
        },
      },
      0
    );

    // PHASE 2: Wait for first 2 rows of images to load
    // Get first 2 marquee rows and collect their images
    const firstTwoRows = Array.from(imageMarqueeRows).slice(0, 2);
    const firstTwoRowsImages: HTMLImageElement[] = [];

    firstTwoRows.forEach((row) => {
      const rowImages = row.querySelectorAll('img');
      firstTwoRowsImages.push(...Array.from(rowImages));
    });

    console.log(
      `📸 [Hero Animation] PHASE 2: Waiting for ${firstTwoRowsImages.length} images from first 2 rows to load`
    );

    const imagePromises = firstTwoRowsImages.map((img: HTMLImageElement, index: number) => {
      return new Promise((resolve) => {
        if (img.complete) {
          console.log(`  ✅ Image ${index + 1}/${firstTwoRowsImages.length} already loaded`);
          resolve(true);
        } else {
          img.addEventListener('load', () => {
            console.log(`  ✅ Image ${index + 1}/${firstTwoRowsImages.length} loaded`);
            resolve(true);
          });
          img.addEventListener('error', () => {
            console.log(`  ⚠️ Image ${index + 1}/${firstTwoRowsImages.length} failed to load`);
            resolve(true);
          });
        }
      });
    });

    Promise.all(imagePromises).then(() => {
      console.log('🎉 [Hero Animation] All first 2 rows images loaded! Starting marquee reveal');

      // Get current timeline position (after heading + logo cloud animations)
      const currentTime = tl.duration();

      // Fade in text marquee and fade out its loader simultaneously
      tl.to(
        textMarquee,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          onStart: () => console.log('  ⏳ Fading in text marquee'),
          onComplete: () => console.log('  ✅ Text marquee visible'),
        },
        currentTime
      ).to(
        textMarqueeLoader,
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            console.log('  ✅ Text marquee loader hidden');
            if (textMarqueeLoader) (textMarqueeLoader as HTMLElement).style.display = 'none';
          },
        },
        currentTime
      );

      // Fade in image marquee rows and fade out loader simultaneously (0.15s after text marquee)
      tl.to(
        imageMarqueeRows,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          onStart: () => console.log('  ⏳ Fading in image marquee rows (with stagger)'),
          onComplete: () => console.log('🎊 [Hero Animation] Animation complete!'),
        },
        currentTime + 0.15
      ).to(
        imageMarqueeLoader,
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            console.log('  ✅ Image marquee loader hidden');
            if (imageMarqueeLoader) (imageMarqueeLoader as HTMLElement).style.display = 'none';
          },
        },
        currentTime + 0.15
      );
    });
  } catch (err) {
    console.error('❌ [Hero Animation] Error in heroIntroAnimation:', err);
  }
};

const LogoMarquee = () => {
  const initMarquee = () => {
    try {
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
                duration: 90,
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

// Run intro animation as soon as hero section is available (don't wait for Webflow or full DOM)
if (typeof window !== 'undefined') {
  const checkAndRunHeroAnimation = () => {
    const heroSection = document.querySelector("[data-section='hero']");
    if (heroSection) {
      heroIntroAnimation();
    } else {
      // Hero section not ready yet, use MutationObserver to watch for it
      const observer = new MutationObserver(() => {
        const heroSection = document.querySelector("[data-section='hero']");
        if (heroSection) {
          observer.disconnect();
          heroIntroAnimation();
        }
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });

      // Fallback: disconnect after 5 seconds to avoid memory leak
      setTimeout(() => observer.disconnect(), 5000);
    }
  };

  // Try immediately, or wait for DOM to start parsing
  if (document.body) {
    checkAndRunHeroAnimation();
  } else {
    document.addEventListener('DOMContentLoaded', checkAndRunHeroAnimation);
  }
}

export { initHeroMarquee, LogoMarquee };
