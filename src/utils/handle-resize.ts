/**
 * Creates a debounced resize handler that only executes after a delay
 * @param callback - Function to execute on resize
 * @param delay - Debounce delay in milliseconds
 * @param options - Optional settings for width-only changes and threshold
 */
const handleResize = (
  callback: () => void,
  delay = 250,
  options?: {
    widthOnly?: boolean;
    threshold?: number;
  }
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  let previousWidth = window.innerWidth;

  const resizeHandler = () => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      if (options?.widthOnly) {
        const currentWidth = window.innerWidth;
        const widthDiff = Math.abs(currentWidth - previousWidth);

        // Only execute if width changed and exceeds threshold
        if (widthDiff >= (options.threshold || 0)) {
          callback();
          previousWidth = currentWidth;
        }
      } else {
        callback();
      }
    }, delay);
  };

  window.addEventListener('resize', resizeHandler);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', resizeHandler);
    clearTimeout(timeoutId);
  };
};

export { handleResize };
