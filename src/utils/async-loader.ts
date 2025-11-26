import type { ComponentConfig } from '../config/component-registry';
import { isPage } from './is-page';

/**
 * Options for loading a component
 */
type LoadOptions = {
  // Maximum number of retry attempts (default: 1)
  maxRetries?: number;
  // Delay between retries in ms (default: 1000)
  retryDelay?: number;
  // Enable detailed logging (default: false)
  debug?: boolean;
};

/**
 * Result of a component load attempt
 */
type LoadResult = {
  id: string;
  success: boolean;
  error?: Error;
  skipped?: boolean;
  skipReason?: string;
};

/**
 * Checks if a component should load based on:
 * 1. Route matching (if routes specified)
 * 2. DOM selector presence (if selector specified)
 */
const shouldLoadComponent = (
  config: ComponentConfig
): {
  should: boolean;
  reason?: string;
} => {
  // Check route matching if routes are specified
  if (config.routes && !isPage(config.routes)) {
    return {
      should: false,
      reason: `Route mismatch (current: ${window.location.pathname})`,
    };
  }

  // Check selector presence if selector is specified
  if (config.selector && !document.querySelector(config.selector)) {
    return {
      should: false,
      reason: `Selector not found: ${config.selector}`,
    };
  }

  return { should: true };
};

/**
 * Loads a single component with retry logic
 */
const loadComponentWithRetry = async (
  config: ComponentConfig,
  options: LoadOptions = {}
): Promise<LoadResult> => {
  const { maxRetries = 1, retryDelay = 1000, debug = false } = options;
  const displayName = config.displayName || config.id;

  // Check if component should load
  const { should, reason } = shouldLoadComponent(config);
  if (!should) {
    if (debug) {
      console.log(`[AsyncLoader] Skipping ${displayName}: ${reason}`);
    }
    return {
      id: config.id,
      success: true,
      skipped: true,
      skipReason: reason,
    };
  }

  let lastError: Error | null = null;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      if (debug && attempt > 0) {
        console.log(`[AsyncLoader] Retry attempt ${attempt} for ${displayName}`);
      }

      // Dynamic import
      const module = await config.loader();

      // Get the init function
      const initFn = module[config.initFunction];

      if (typeof initFn !== 'function') {
        throw new Error(
          `Init function "${config.initFunction}" not found or not a function in module`
        );
      }

      // Execute init function with optional arguments
      if (config.args && config.args.length > 0) {
        initFn(...config.args);
      } else {
        initFn();
      }

      if (debug) {
        console.log(`[AsyncLoader] Successfully loaded ${displayName}`);
      }

      return { id: config.id, success: true };
    } catch (error) {
      lastError = error as Error;
      attempt++;

      if (attempt <= maxRetries) {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }

  // All attempts failed
  console.error(
    `[AsyncLoader] Failed to load ${displayName} after ${maxRetries + 1} attempts:`,
    lastError
  );

  return {
    id: config.id,
    success: false,
    error: lastError!,
  };
};

/**
 * Loads multiple components in parallel
 */
export const loadComponents = async (
  components: ComponentConfig[],
  options: LoadOptions = {}
): Promise<LoadResult[]> => {
  const { debug = false } = options;

  if (debug) {
    console.log(`[AsyncLoader] Starting to load ${components.length} components in parallel`);
  }

  // Use Promise.allSettled to load all components in parallel
  // This ensures one failure doesn't block others
  const results = await Promise.allSettled(
    components.map((config) => loadComponentWithRetry(config, options))
  );

  // Process results
  const loadResults = results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    // This shouldn't happen since loadComponentWithRetry catches errors
    // But handle it just in case
    const config = components[index];
    console.error(
      `[AsyncLoader] Unexpected error loading ${config.displayName || config.id}:`,
      result.reason
    );
    return {
      id: config.id,
      success: false,
      error: result.reason,
      skipped: false,
    };
  });

  // Summary logging
  const successful = loadResults.filter((r) => r.success && r.skipped !== true).length;
  const skipped = loadResults.filter((r) => r.skipped === true).length;
  const failed = loadResults.filter((r) => r.success === false).length;

  if (debug || failed > 0) {
    console.log(
      `[AsyncLoader] Load summary: ${successful} successful, ${skipped} skipped, ${failed} failed`
    );
  }

  return loadResults;
};

/**
 * Filters components by route and loads them
 */
export const loadPageComponents = async (
  components: ComponentConfig[],
  options: LoadOptions = {}
): Promise<LoadResult[]> => {
  // Filter to only components matching current route
  const matchingComponents = components.filter((config) => {
    if (!config.routes) return false;
    return isPage(config.routes);
  });

  return loadComponents(matchingComponents, options);
};

/**
 * Loads global components (no route restriction)
 */
export const loadGlobalComponents = async (
  components: ComponentConfig[],
  options: LoadOptions = {}
): Promise<LoadResult[]> => {
  return loadComponents(components, options);
};
