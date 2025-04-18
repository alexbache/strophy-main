import gsap from 'gsap';

import { handleResize } from '$utils/handle-resize';

const imageMarquee = () => {
  try {
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

      // Kill any existing animations on this row
      gsap.killTweensOf(row);

      // Create the infinite marquee animation
      gsap.to(row, {
        x: -imageWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
        // Ensure smooth looping
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % imageWidth),
        },
      });
    };

    marqueeRows.forEach((row) => {
      const image = row.querySelector('img');
      if (!image) {
        console.error('No image found in marquee row');
        return;
      }

      // Clone the image and append it
      const clone = image.cloneNode(true);
      row.appendChild(clone);

      // Initial animation setup
      updateRowAnimation(row, image);

      // Update animation on window resize
      handleResize(
        () => {
          updateRowAnimation(row, image);
        },
        100,
        {
          widthOnly: true,
          threshold: 10,
        }
      );
    });
  } catch (error) {
    console.error('Error in imageMarquee:', error);
  }
};

const initPrizesBgMarquee = () => {
  imageMarquee();
};

export { initPrizesBgMarquee };
