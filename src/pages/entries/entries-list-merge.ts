/**
 * Webflow workaround: when a large Collection List is split into multiple lists
 * (e.g. 0-100, 101-200...), Webflow renders separate `.w-dyn-list` blocks.
 *
 * In a 3-column grid, that can create visual "holes" at list boundaries.
 * This merges all split lists in the All Entries section into the first list.
 */
const SELECTORS = {
  ALL_ENTRIES_SECTION: '#section-all-entries',
  ENTRY_WRAPPERS: '.entry-grid_wrapper.w-dyn-list',
  ENTRY_LISTS: '[data-filter-list-id="entries"]',
  WEBFLOW_DYN_LIST_WRAPPER: '.w-dyn-list',
} as const;

type EntryListTarget = {
  wrapper: HTMLElement;
  list: HTMLElement;
};

function mergeChildrenIntoFirst(primary: HTMLElement, sources: EntryListTarget[]) {
  sources.forEach(({ list }) => {
    // Move all children to preserve order and existing inline styles.
    while (list.firstElementChild) {
      primary.appendChild(list.firstElementChild);
    }
  });
}

function hideEmptySourceWrappers(primaryWrapper: HTMLElement | null, sources: EntryListTarget[]) {
  sources.forEach(({ wrapper }) => {
    if (wrapper !== primaryWrapper) {
      wrapper.style.display = 'none';
    }
  });
}

function getEntryListTargets(section: Element): EntryListTarget[] {
  const wrappers = Array.from(section.querySelectorAll(SELECTORS.ENTRY_WRAPPERS)) as HTMLElement[];

  return wrappers
    .map((wrapper) => {
      const list = wrapper.querySelector(SELECTORS.ENTRY_LISTS) as HTMLElement | null;
      return list ? { wrapper, list } : null;
    })
    .filter(Boolean) as EntryListTarget[];
}

const initEntriesListMerge = () => {
  const section = document.querySelector(SELECTORS.ALL_ENTRIES_SECTION);
  if (!section) return;

  const targets = getEntryListTargets(section);
  if (targets.length <= 1) return;

  const [primary, ...rest] = targets;
  mergeChildrenIntoFirst(primary.list, rest);
  hideEmptySourceWrappers(primary.wrapper, rest);
};

export { initEntriesListMerge };
