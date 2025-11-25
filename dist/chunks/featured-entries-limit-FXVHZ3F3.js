import "./chunk-JG2TWXUP.js";

// src/pages/entries/featured-entries-limit.ts
var featuredEntriesList = document.querySelector("#featured-entries-list");
var featuredEntriesLimit = 3;
var renderFeaturedEntries = () => {
  const featuredEntries = Array.from(featuredEntriesList.children);
  featuredEntries.forEach((entry) => {
    entry.style.display = "none";
  });
  const indices = /* @__PURE__ */ new Set();
  while (indices.size < featuredEntriesLimit) {
    indices.add(Math.floor(Math.random() * featuredEntries.length));
  }
  Array.from(indices).forEach((index) => {
    featuredEntries[index].style.display = "block";
  });
};
var initFeaturedEntriesLimit = () => {
  renderFeaturedEntries();
};
export {
  initFeaturedEntriesLimit
};
//# sourceMappingURL=featured-entries-limit-FXVHZ3F3.js.map
