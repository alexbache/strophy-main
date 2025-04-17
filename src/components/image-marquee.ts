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

const initImageMarquee = () => {
  imageMarquee();
};

export { initImageMarquee };
