import { getMobileMenu } from './nav';

const SELECTORS = {
  CONTACT_MODAL: '#contact-modal',
  CONTACT_MODAL_OPEN: '[contact-modal-action="open"]',
  CONTACT_MODAL_CLOSE: '[contact-modal-action="close"]',
};

const initContactModal = () => {
  const contactModalOpenButtons = document.querySelectorAll(SELECTORS.CONTACT_MODAL_OPEN);
  const contactModalCloseButtons = document.querySelectorAll(SELECTORS.CONTACT_MODAL_CLOSE);
  const contactModal = document.querySelector(SELECTORS.CONTACT_MODAL) as HTMLElement;

  if (
    contactModalOpenButtons.length === 0 ||
    contactModalCloseButtons.length === 0 ||
    !contactModal
  ) {
    console.error(
      'missing elements',
      'contactModalOpenButtons',
      contactModalOpenButtons,
      'contactModalCloseButtons',
      contactModalCloseButtons,
      'contactModal',
      contactModal
    );
  }

  const openModal = () => {
    contactModal.style.display = 'block';
  };

  const closeModal = () => {
    contactModal.style.display = 'none';
    const { mobileMenu } = getMobileMenu();
    if (mobileMenu.style.display === 'block') {
      mobileMenu.style.display = 'none';
    }
  };

  contactModalOpenButtons.forEach((button) => {
    button.addEventListener('click', () => {
      openModal();
    });
  });

  contactModalCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeModal();
    });
  });
};

export { initContactModal };
