import { entryPage } from './entry-page';
import { heroImageMarquee } from './hero-marquee';
import { phaseControl } from './phase-control';
import { isPage } from './utils/ispage';

window.Webflow ||= [];
window.Webflow.push(() => {
  phaseControl();
  if (isPage('/entries/*')) {
    entryPage();
  }
});

window.Webflow.push(() => {
  if (isPage('/')) {
    // Get slider elements
    const imageSlider = document.querySelector('[slider-element="image-row"]') as HTMLElement;
    const nextButton = document.querySelector('[slider-element="btn-next"]') as HTMLElement;
    const prevButton = document.querySelector('[slider-element="btn-prev"]') as HTMLElement;

    if (!imageSlider) {
      throw new Error(
        'Image slider element not found. Please check that element with slider-element="image row" exists.'
      );
    }
    if (!nextButton) {
      throw new Error(
        'Next button element not found. Please check that element with slider-element="btn-next" exists.'
      );
    }
    if (!prevButton) {
      throw new Error(
        'Previous button element not found. Please check that element with slider-element="btn-prev" exists.'
      );
    }

    if (imageSlider && nextButton && prevButton) {
      const images = imageSlider.querySelectorAll('img');
      let currentImageIndex = 0;

      // Add function to calculate the left alignment point
      const getLeftAlignmentPoint = () => {
        const windowWidth = window.innerWidth;
        const maxContainerWidth = 1350; // max-w-7xl equivalent
        const pagePadding = window.innerWidth * 0.025; // 2.5% of viewport width

        // If window is wider than max container + padding
        if (windowWidth > maxContainerWidth + pagePadding * 2) {
          // Center align the container and calculate left point
          const leftOffset = (windowWidth - maxContainerWidth) / 2;
          return leftOffset;
        }
        // Use page padding as alignment point
        return pagePadding;
      };

      // Update scroll calculation
      const scrollToImage = (index: number) => {
        const currentImage = images[index] as HTMLElement;
        const alignmentPoint = getLeftAlignmentPoint();
        const scrollPosition = currentImage.offsetLeft - alignmentPoint;

        imageSlider.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      };

      // Update click handlers
      nextButton.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
          currentImageIndex = currentImageIndex + 1;
          scrollToImage(currentImageIndex);
        } else {
          currentImageIndex = 0;
          scrollToImage(currentImageIndex);
        }
      });

      prevButton.addEventListener('click', () => {
        if (currentImageIndex > 0) {
          currentImageIndex = currentImageIndex - 1;
          scrollToImage(currentImageIndex);
        } else {
          currentImageIndex = images.length - 1;
          scrollToImage(currentImageIndex);
        }
      });

      // Optional: Update alignment on window resize
      window.addEventListener('resize', () => {
        scrollToImage(currentImageIndex);
      });
    }
  }
});

window.Webflow.push(() => {
  if (isPage('/')) {
    heroImageMarquee();
  }
});

window.Webflow.push(() => {
  const navbar = document.querySelector('#navbar');

  // Find all links that point to hash fragments and set scroll behavior to instant
  // Because we have some interactions throughout the page, these interfere with the smooth scroll. We need to set the scroll behavior to instant for these links.
  const hashLinks = navbar?.querySelectorAll('a[href^="/#"]');

  if (hashLinks && hashLinks.length > 0) {
    hashLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (!href) return;

        // If we're not on homepage, redirect first
        if (window.location.pathname !== '/') {
          window.location.href = href;
          return;
        }

        // Otherwise scroll to hash on homepage
        const hash = href.replace('/', '');
        document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' });
      });
    });
  }
});
