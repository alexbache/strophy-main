import {
  getMobileMenu,
  stopPageScroll
} from "./chunk-5UFU7PZY.js";
import "./chunk-ISCHIRRL.js";
import "./chunk-LRAIBFHB.js";
import "./chunk-G4OS44JP.js";
import "./chunk-TLP63QE5.js";
import "./chunk-6KMKHOBV.js";
import "./chunk-UQEN3MJC.js";
import "./chunk-JG2TWXUP.js";

// src/components/contact-modal.ts
var SELECTORS = {
  CONTACT_MODAL: "#contact-modal",
  CONTACT_MODAL_OPEN: '[contact-modal-action="open"]',
  CONTACT_MODAL_CLOSE: '[contact-modal-action="close"]'
};
var initContactModal = () => {
  const contactModalOpenButtons = document.querySelectorAll(SELECTORS.CONTACT_MODAL_OPEN);
  const contactModalCloseButtons = document.querySelectorAll(SELECTORS.CONTACT_MODAL_CLOSE);
  const contactModal = document.querySelector(SELECTORS.CONTACT_MODAL);
  if (contactModalOpenButtons.length === 0 || contactModalCloseButtons.length === 0 || !contactModal) {
    console.error(
      "missing elements",
      "contactModalOpenButtons",
      contactModalOpenButtons,
      "contactModalCloseButtons",
      contactModalCloseButtons,
      "contactModal",
      contactModal
    );
  }
  const openModal = () => {
    contactModal.style.display = "block";
  };
  const closeModal = () => {
    contactModal.style.display = "none";
    const { mobileMenu } = getMobileMenu();
    if (mobileMenu.style.display === "block") {
      mobileMenu.style.display = "none";
    }
  };
  contactModalOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("stopping page scroll - contact modal open");
      stopPageScroll(true);
      openModal();
    });
  });
  contactModalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      stopPageScroll(false);
      closeModal();
    });
  });
};
export {
  initContactModal
};
//# sourceMappingURL=contact-modal-62VV73LT.js.map
