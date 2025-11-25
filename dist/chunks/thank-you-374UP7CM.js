import {
  getViewportHeightMeasurements
} from "./chunk-UQEN3MJC.js";
import "./chunk-JG2TWXUP.js";

// src/pages/thankyou/thank-you.ts
var sectionResize = () => {
  const { innerHeight, navbarHeight } = getViewportHeightMeasurements();
  const section = document.querySelector("#thank-you");
  if (!section) console.error("Thank you section not found - #thank-you");
  if (section) {
    section.style.height = `${innerHeight}px`;
    section.style.paddingBottom = `${navbarHeight}px`;
  }
};
var initThankYou = () => {
  sectionResize();
};
export {
  initThankYou
};
//# sourceMappingURL=thank-you-374UP7CM.js.map
