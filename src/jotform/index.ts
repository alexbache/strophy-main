/**
 * Waits for JotForm script to load
 * @returns Promise that resolves when script is loaded
 */
const waitForJotForm = (): Promise<void> => {
  console.log('Waiting for JotForm script to load');
  return new Promise((resolve) => {
    const checkScript = () => {
      const script = document.querySelector('#jotform');
      if (script) {
        resolve();
      } else {
        setTimeout(checkScript, 100);
      }
    };
    checkScript();
  });
};

export const initJotForm = async () => {
  await waitForJotForm();

  console.log('JotForm script is now loaded and ready');

  const dateField = document.querySelector('#id_11');

  if (dateField) {
    console.log('Date field found', dateField);
  } else {
    console.log('Date field not found');
  }

  // JotForm script is now loaded and ready
};
