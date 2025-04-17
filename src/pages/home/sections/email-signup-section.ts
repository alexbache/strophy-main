import { getViewportHeightMeasurements } from '../../../utils/page-utils';

const SELECTORS = {
  section: '#layout-email-signup',
};

const emailSignupSection = () => {
  const section = document.querySelector(SELECTORS.section) as HTMLElement;

  if (!section) {
    console.error(`No email signup section found, set using: ${SELECTORS.section}`);
    return;
  }

  const { innerHeight } = getViewportHeightMeasurements();

  section.style.height = `${innerHeight}px`;
};

const initEmailSignupSection = () => {
  emailSignupSection();
};

export { initEmailSignupSection };
