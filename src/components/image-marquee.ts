import gsap from 'gsap';

import { handleResize } from '$utils/handle-resize';

const imageMarquee = () => {
  try {
    const marqueeRows = document.querySelectorAll('[image-marquee="row"]');

    if (!marqueeRows || marqueeRows.length === 0) {
      console.error('No marquee rows found.');
      throw new Error('Marquee rows not found');
    }

    // Function to update animation for a row
    const updateRowAnimation = (row: Element, image: HTMLImageElement, imageOffset: boolean) => {
      // Only start animation if image has actual dimensions
      if (!image.complete || image.naturalWidth === 0) {
        // Wait for image to load before starting animation
        image.addEventListener('load', () => updateRowAnimation(row, image, imageOffset));
        return;
      }

      const imageWidth = image.clientWidth;
      if (imageWidth === 0) {
        console.warn('Image width is 0, delaying animation');
        // Retry after a short delay if width is 0
        setTimeout(() => updateRowAnimation(row, image, imageOffset), 100);
        return;
      }

      // Calculate the initial offset
      const initialX = imageOffset ? -imageWidth * 0.65 : 0;

      gsap.killTweensOf(row);
      gsap.to(row, {
        x: -imageWidth + initialX,
        duration: 120,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % imageWidth),
        },
      });

      // Set the initial position after starting the animation
      if (imageOffset) {
        gsap.set(row, { x: initialX });
      }
    };

    marqueeRows.forEach((row) => {
      let imageOffset: boolean = false;

      const imageOffsetAttr = row.getAttribute('image-offset');

      if (imageOffsetAttr) {
        imageOffset = true;
      }

      console.log('imageOffset', imageOffset);

      const image = row.querySelector('img');
      if (!image) {
        console.error('No image found in marquee row');
        return;
      }

      const clone = image.cloneNode(true) as HTMLImageElement;
      row.appendChild(clone);

      // Initialize animation and handle resize
      updateRowAnimation(row, image, imageOffset);

      handleResize(() => updateRowAnimation(row, image, imageOffset), 100, {
        widthOnly: true,
        threshold: 10,
      });
    });
  } catch (error) {
    console.error('Error in imageMarquee:', error);
  }
};

const initPrizesBgMarquee = () => {
  imageMarquee();
};

export { initPrizesBgMarquee };
