export const waitForDOMReady = (): Promise<void> => {
  return new Promise((resolve) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => resolve());
    } else {
      // DOM is already ready
      resolve();
    }
  });
};
