import './hero-images-marquee.css';

const throttleImages = (): Promise<void> => {
  console.log('throttling images');
  return new Promise((resolve) => {
    const heroSection = document.querySelector("[data-section='hero']");
    if (!heroSection) {
      console.error('⚠️ [Image Throttle] Hero section not found, skipping image throttling');
      resolve();
      return;
    }

    // Images to load immediately
    const imagesToLoadImmediately = Array.from(
      heroSection.querySelectorAll('[data-load-immediately="true"] img')
    ) as HTMLImageElement[];

    if (!imagesToLoadImmediately.length) {
      console.error('[Image Throttle] Images to load immediately not found');
      resolve();
      return;
    }

    // Images to throttle
    const imagesToThrottle = Array.from(
      heroSection.querySelectorAll('img:not([data-load-immediately="true"])')
    ) as HTMLImageElement[];

    if (!imagesToThrottle.length) {
      console.error('[Image Throttle] Images to throttle not found');
      resolve();
      return;
    }

    console.log('images to throttle', { imagesToLoadImmediately, imagesToThrottle });

    imagesToThrottle.forEach((img) => {
      if (img.src) {
        img.setAttribute('data-src', img.src);
        img.setAttribute('data-srcset', img.srcset);
        img.removeAttribute('src');
        img.removeAttribute('srcset');
      }
    });

    // Wait for top row images to load
    const imagesToLoadImmediatelyPromises = imagesToLoadImmediately.map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve(true);
        } else {
          img.addEventListener('load', () => {
            resolve(true);
          });
          img.addEventListener('error', () => {
            resolve(true);
          });
        }
      });
    });

    Promise.all(imagesToLoadImmediatelyPromises).then(() => {
      alert('images to load immediately loaded');

      // Restore src from data-src for bottom row images (non-blocking)
      imagesToThrottle.forEach((img) => {
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
          img.src = dataSrc;
          img.srcset = img.getAttribute('data-srcset') || '';
          img.removeAttribute('data-src');
          img.removeAttribute('data-srcset');
        }
      });

      const imageMarqueeRowsToDuplicate = Array.from(
        heroSection.querySelectorAll('[data-marquee-clone="true"]')
      ) as HTMLDivElement[];

      imageMarqueeRowsToDuplicate.forEach((row) => {
        const clone = row.cloneNode(true) as HTMLElement;
        row.parentElement?.appendChild(clone);
      });

      // ✅ Resolve immediately after starting bottom row loads (don't wait for them)
      resolve();
    });
  });
};

const initHeroImageMarquee = async (): Promise<void> => {
  return throttleImages();
};

export { initHeroImageMarquee };
