import { gsap } from 'gsap';

const prizesAnimation = () => {
  const SELECTORS = {
    grandTotal: '#prizes-grand-total',
    podium1: '#podium-1',
    podium2: '#podium-2',
    podium3: '#podium-3',
    podiumInner: '[podium-element="inner"]',
    podiumAmount: '[podium-element="amount"]',
    podiumContainer: '#podium-container',
  };

  const grandTotalElement = document.querySelector(SELECTORS.grandTotal);
  const podium1Inner = document.querySelector(`${SELECTORS.podium1} ${SELECTORS.podiumInner}`);
  const podium2Inner = document.querySelector(`${SELECTORS.podium2} ${SELECTORS.podiumInner}`);
  const podium3Inner = document.querySelector(`${SELECTORS.podium3} ${SELECTORS.podiumInner}`);
  const podium1Amount = document.querySelector(`${SELECTORS.podium1} ${SELECTORS.podiumAmount}`);
  const podium2Amount = document.querySelector(`${SELECTORS.podium2} ${SELECTORS.podiumAmount}`);
  const podium3Amount = document.querySelector(`${SELECTORS.podium3} ${SELECTORS.podiumAmount}`);
  const podiumContainer = document.querySelector(SELECTORS.podiumContainer);

  if (
    !podium1Inner ||
    !podium2Inner ||
    !podium3Inner ||
    !podium1Amount ||
    !podium2Amount ||
    !podium3Amount ||
    !podiumContainer
  ) {
    console.error('One or more podium elements not found');
    return;
  }

  // Move hasAnimated flags to the top and separate them
  let podiumsHasAnimated = false;
  let totalHasAnimated = false;

  // Add this right after the element checks
  if (!grandTotalElement) {
    console.error('Prizes grand total element not found');
    return;
  }

  // Get the target value for grand total here, before the observers
  const targetValue = parseInt(grandTotalElement.textContent?.replace(/[^0-9]/g, '') || '0');

  // Create intersection observer for podiums
  const podiumObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !podiumsHasAnimated) {
          podiumsHasAnimated = true;

          // Animate podium heights to slightly less than original
          gsap.fromTo(
            podium1Inner,
            { height: '0%' },
            { height: '90%', duration: 1.5, ease: 'power2.out' }
          );
          gsap.fromTo(
            podium2Inner,
            { height: '0%' },
            { height: '70%', duration: 1.5, ease: 'power2.out' }
          );
          gsap.fromTo(
            podium3Inner,
            { height: '0%' },
            { height: '50%', duration: 1.5, ease: 'power2.out' }
          );

          // Add hover animations
          const addHoverAnimation = (element: Element, baseHeight: string) => {
            element.addEventListener('mouseenter', () => {
              gsap.to(element, {
                height: `${parseInt(baseHeight) + 10}%`,
                duration: 0.3,
                ease: 'power2.out',
              });
            });

            element.addEventListener('mouseleave', () => {
              gsap.to(element, {
                height: baseHeight,
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          };

          addHoverAnimation(podium1Inner, '90%');
          addHoverAnimation(podium2Inner, '70%');
          addHoverAnimation(podium3Inner, '50%');

          // Animate podium amounts
          const animatePodiumAmount = (element: Element) => {
            const targetValue = parseInt(element.textContent?.replace(/[^0-9]/g, '') || '0');

            gsap.fromTo(
              element,
              {
                textContent: '0',
                duration: 0,
              },
              {
                textContent: targetValue,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                onUpdate: function () {
                  const value = Math.floor(
                    gsap.getProperty(this.targets()[0], 'textContent') as number
                  );
                  element.textContent = `$${value.toLocaleString()}`;
                },
              }
            );
          };

          animatePodiumAmount(podium1Amount);
          animatePodiumAmount(podium2Amount);
          animatePodiumAmount(podium3Amount);
        }
      });
    },
    {
      threshold: 0.3, // Add threshold to ensure better triggering
    }
  );

  // Update grand total observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !totalHasAnimated) {
          totalHasAnimated = true;

          gsap.fromTo(
            grandTotalElement,
            {
              textContent: '0',
              duration: 0,
            },
            {
              textContent: targetValue,
              duration: 3,
              ease: 'power1.out',
              snap: { textContent: 1 },
              onUpdate: function () {
                const value = Math.floor(
                  gsap.getProperty(this.targets()[0], 'textContent') as number
                );
                grandTotalElement.textContent = `$${value.toLocaleString()}`;
              },
            }
          );
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  // Add cleanup function
  const cleanup = () => {
    podiumObserver.disconnect();
    observer.disconnect();
  };

  // Observe elements
  podiumObserver.observe(podiumContainer);
  observer.observe(grandTotalElement);

  // Clean up on page unload
  window.addEventListener('unload', cleanup);

  return cleanup; // Return cleanup function for manual cleanup if needed
};

const imageMarquee = () => {
  const marqueeRows = document.querySelectorAll('[image-marquee="row"]');

  if (!marqueeRows || marqueeRows.length === 0) {
    console.error(
      'No marquee rows found. Please check that elements with marquee-element="img-list-wrapper" exist.'
    );
    throw new Error('Marquee rows not found');
  }

  // Function to update animation for a row
  const updateRowAnimation = (row: Element, image: HTMLImageElement) => {
    const imageWidth = image.clientWidth;

    // Create unique animation name for this row
    const animationName = `marqueeScroll_${Math.random().toString(36).substr(2, 9)}`;

    // Create keyframe animation
    const keyframes = `
        @keyframes ${animationName} {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${imageWidth}px);
          }
        }
      `;

    // Create and append style element
    const styleId = `style_${animationName}`;
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
    style.textContent = keyframes;

    // Apply animation to row
    (row as HTMLElement).style.animation = `${animationName} 20s linear infinite`;
  };

  marqueeRows.forEach((row) => {
    const image = row.querySelector('img');
    if (!image) {
      console.error('No image found in marquee row');
      return;
    }

    const clone = image.cloneNode(true);
    row.appendChild(clone);

    // Initial animation setup
    updateRowAnimation(row, image);

    // Update animation on window resize
    window.addEventListener('resize', () => {
      updateRowAnimation(row, image);
    });
  });
};

export { imageMarquee, prizesAnimation };
