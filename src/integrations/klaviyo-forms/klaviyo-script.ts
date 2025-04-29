function loadKlaviyoScript(apiKey: string) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = `https://static.klaviyo.com/onsite/js/${apiKey}/klaviyo.js`;
  document.head.appendChild(script);
}

const initKlaviyoScript = () => {
  loadKlaviyoScript('HzKz7A');
};

export { initKlaviyoScript };
