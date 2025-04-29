import { setEndState } from '../pages/home/sections/intro-scene';

const handleHashLinkNavigation = () => {
  const navbar = document.querySelector('#navbar');

  const hashLinks = navbar?.querySelectorAll('a[href^="/#"]');

  if (hashLinks && hashLinks.length > 0) {
    hashLinks.forEach((link) => {
      // Create button element and copy attributes/styling from link
      const button = document.createElement('button');
      button.textContent = link.textContent;
      button.className = link.className;
      button.setAttribute('data-href', link.getAttribute('href') || '');

      // Replace link with button
      link.parentNode?.replaceChild(button, link);

      button.addEventListener('click', (event) => {
        event.preventDefault();
        setEndState();
        const href = button.getAttribute('data-href');
        // console.log('Button clicked:', href);

        if (!href) {
          // console.log('No href found on button');
          return;
        }

        if (window.location.pathname !== '/') {
          window.location.href = href;
          return;
        }

        const hash = href.replace('/', '');
        const element = document.querySelector(hash);

        if (!element) return;

        const navHeight = navbar?.getBoundingClientRect().height || 0;
        const elementPosition = (element as HTMLElement).offsetTop;

        const scrollTo = elementPosition - navHeight;

        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth',
        });
      });
    });
  }
};

export { handleHashLinkNavigation };
