import {
  handleResize
} from "./chunk-TLP63QE5.js";
import {
  isTablet
} from "./chunk-UQEN3MJC.js";
import "./chunk-JG2TWXUP.js";

// src/components/logo-marquee/logo-marquee.ts
var initLogoMarquee = () => {
  const initMarquee = () => {
    const marqueeRows = document.querySelectorAll('[logo-marquee-element="outer-row"]');
    const marqueeRowInners = document.querySelectorAll('[logo-marquee-element="inner-row"]');
    if (!marqueeRows.length || !marqueeRowInners.length) return;
    marqueeRows.forEach((marqueeRow, index) => {
      const marqueeRowInner = marqueeRowInners[index];
      if (!marqueeRowInner) return;
      const clonedElement = marqueeRow.querySelector('[data-clone="true"]');
      if (isTablet()) {
        if (!clonedElement) {
          const clone = marqueeRowInner.cloneNode(true);
          clone.setAttribute("data-clone", "true");
          marqueeRow.appendChild(clone);
        }
      } else {
        if (clonedElement) {
          clonedElement.remove();
        }
      }
    });
  };
  initMarquee();
  handleResize(initMarquee, 100, {
    widthOnly: true,
    threshold: 10
  });
};
export {
  initLogoMarquee
};
//# sourceMappingURL=logo-marquee-6L5SWCGT.js.map
