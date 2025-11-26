import './pages/home/sections/hero/hero-images-marquee.css';
import './pages/home/sections/hero/hero-text-marquee.css';

import { COMPONENT_REGISTRY } from './config/component-registry';
import { loadGlobalComponents, loadPageComponents } from './utils/async-loader';
import { waitForDOMReady } from './utils/dom-ready';

console.log('Index.ts loaded');

// Main initialization using DOM ready
waitForDOMReady().then(async () => {
  // Load global and page-specific components in parallel
  const [globalResults, pageResults] = await Promise.all([
    loadGlobalComponents(COMPONENT_REGISTRY.global, {
      maxRetries: 1,
      debug: true,
    }),
    loadPageComponents(COMPONENT_REGISTRY.pageSpecific, {
      maxRetries: 1,
      debug: true,
    }),
  ]);

  // Track failed components for error reporting
  const allResults = [...globalResults, ...pageResults];
  const failedComponents = allResults.filter((r) => !r.success);

  if (failedComponents.length > 0) {
    console.error(
      '[App] Some components failed to load:',
      failedComponents.map((r) => r.id)
    );
  }
});
