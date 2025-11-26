import "./chunk-JG2TWXUP.js";

// src/integrations/klaviyo-forms/klaviyo-styling.ts
var initKlaviyoStyling = () => {
  const klaviyoForms = document.querySelectorAll('[data-form="klaviyo"]');
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const formRows = mutation.target.querySelectorAll(
        '[data-testid="form-row"]'
      );
      formRows.forEach((formRow) => {
        if (formRow.children.length === 2) {
          formRow.classList.add("stacked-form");
        }
      });
      const formLinks = mutation.target.querySelectorAll(
        "a"
      );
      formLinks.forEach((formLink) => {
        formLink.setAttribute("target", "_blank");
      });
    });
  });
  klaviyoForms.forEach((form) => {
    mutationObserver.observe(form, {
      childList: true,
      subtree: true
    });
  });
};
export {
  initKlaviyoStyling
};
//# sourceMappingURL=klaviyo-styling-OE3DPH5O.js.map
