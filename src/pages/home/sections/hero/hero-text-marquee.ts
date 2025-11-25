import './hero-text-marquee.css';

const initHeroTextMarquee = () => {
  const textMarqueeInner = document.querySelector('.text-marquee_inner');
  if (!textMarqueeInner) {
    console.error('Text marquee inner not found');
    return;
  }
};

export { initHeroTextMarquee };
