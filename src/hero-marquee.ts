export const heroImageMarquee = () => {
  const marqueeRows = document.querySelectorAll('[marquee-element="img-list-wrapper"]');

  if (!marqueeRows || marqueeRows.length === 0) {
    console.error(
      'No marquee rows found. Please check that elements with marquee-element="img-list-wrapper" exist.'
    );
    throw new Error('Marquee rows not found');
  }

  marqueeRows.forEach((row) => {
    const clone = row.cloneNode(true);
    row.parentNode?.appendChild(clone);
  });
};
