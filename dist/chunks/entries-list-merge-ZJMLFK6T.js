import "./chunk-JG2TWXUP.js";

// src/pages/entries/entries-list-merge.ts
var SELECTORS = {
  ALL_ENTRIES_SECTION: "#section-all-entries",
  ENTRY_WRAPPERS: ".entry-grid_wrapper.w-dyn-list",
  ENTRY_LISTS: '[data-filter-list-id="entries"]',
  WEBFLOW_DYN_LIST_WRAPPER: ".w-dyn-list"
};
function mergeChildrenIntoFirst(primary, sources) {
  sources.forEach(({ list }) => {
    while (list.firstElementChild) {
      primary.appendChild(list.firstElementChild);
    }
  });
}
function hideEmptySourceWrappers(primaryWrapper, sources) {
  sources.forEach(({ wrapper }) => {
    if (wrapper !== primaryWrapper) {
      wrapper.style.display = "none";
    }
  });
}
function getEntryListTargets(section) {
  const wrappers = Array.from(section.querySelectorAll(SELECTORS.ENTRY_WRAPPERS));
  return wrappers.map((wrapper) => {
    const list = wrapper.querySelector(SELECTORS.ENTRY_LISTS);
    return list ? { wrapper, list } : null;
  }).filter(Boolean);
}
var initEntriesListMerge = () => {
  const section = document.querySelector(SELECTORS.ALL_ENTRIES_SECTION);
  if (!section) return;
  const targets = getEntryListTargets(section);
  if (targets.length <= 1) return;
  const [primary, ...rest] = targets;
  mergeChildrenIntoFirst(primary.list, rest);
  hideEmptySourceWrappers(primary.wrapper, rest);
};
export {
  initEntriesListMerge
};
//# sourceMappingURL=entries-list-merge-ZJMLFK6T.js.map
