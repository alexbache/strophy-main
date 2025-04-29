import './klaviyo-styles.css';

const initKlaviyoStyling = () => {
  const klaviyoForms = document.querySelectorAll('[data-form="klaviyo"]');

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const formRows = (mutation.target as HTMLElement).querySelectorAll(
        '[data-testid="form-row"]'
      ) as NodeListOf<HTMLElement>;

      // Add stacked-form class to form rows with 2 children
      formRows.forEach((formRow) => {
        if (formRow.children.length === 2) {
          formRow.classList.add('stacked-form');
        }
      });

      const formLinks = (mutation.target as HTMLElement).querySelectorAll(
        'a'
      ) as NodeListOf<HTMLElement>;

      formLinks.forEach((formLink) => {
        formLink.setAttribute('target', '_blank');
      });
    });
  });

  klaviyoForms.forEach((form) => {
    mutationObserver.observe(form, {
      childList: true,
      subtree: true,
    });
  });
};

export { initKlaviyoStyling };
