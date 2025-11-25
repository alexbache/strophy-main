import {
  getViewportHeightMeasurements
} from "./chunk-UQEN3MJC.js";
import "./chunk-JG2TWXUP.js";

// src/pages/home/sections/email-signup-section.ts
var SELECTORS = {
  section: "#layout-email-signup"
};
var emailSignupSection = () => {
  const section = document.querySelector(SELECTORS.section);
  if (!section) {
    console.error(`No email signup section found, set using: ${SELECTORS.section}`);
    return;
  }
  const { innerHeight } = getViewportHeightMeasurements();
  section.style.height = `${innerHeight}px`;
};
var initEmailSignupSection = () => {
  emailSignupSection();
};
export {
  initEmailSignupSection
};
//# sourceMappingURL=email-signup-section-UFGLJIG4.js.map
