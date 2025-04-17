/**
 * Adds target="_blank" and rel="noopener noreferrer" to external links
 */
const handleExternalLinks = () => {
  // Get all links on the page
  const links = document.querySelectorAll('a');

  links.forEach((link) => {
    const href = link.getAttribute('href');

    // Check if link is external (starts with http/https or different domain)
    if (
      href &&
      (href.startsWith('http') ||
        href.startsWith('https') ||
        (href.includes('://') && !href.includes(window.location.hostname)))
    ) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
};

export { handleExternalLinks };
