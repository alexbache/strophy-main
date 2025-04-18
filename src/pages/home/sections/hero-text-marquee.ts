import gsap from 'gsap';

const heroTextMarquee = () => {
  const marqueeInnerFrame = document.querySelector('[marquee-element="text-inner-frame"]');
  if (!marqueeInnerFrame)
    console.error('Marquee inner frame not found = [marquee-element="text-inner-frame"]');

  if (marqueeInnerFrame) {
    // Clone the content to create seamless loop
    const content = marqueeInnerFrame.innerHTML;
    marqueeInnerFrame.innerHTML = content + content;

    // Create GSAP animation
    gsap.to(marqueeInnerFrame, {
      x: '-50%', // Move left by 50% since we duplicated content
      duration: 30,
      ease: 'none',
      repeat: -1, // Infinite loop
    });
  }
};

const initHeroTextMarquee = () => {
  heroTextMarquee();
};

export { initHeroTextMarquee };
