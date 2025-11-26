import {
  getCurrentPhase
} from "./chunk-FGRXIL4H.js";
import "./chunk-6KMKHOBV.js";
import "./chunk-UQEN3MJC.js";
import "./chunk-JG2TWXUP.js";

// src/pages/entries/section-renderer.ts
var PAGE_SECTIONS = {
  WINNERS: "#section-winners",
  FEATURED_ENTRIES: "#section-featured-entries",
  ALL_ENTRIES: "#section-all-entries"
};
var toggleSection = (section, show) => {
  section.style.display = show ? "block" : "none";
};
var getSection = (section) => {
  return document.querySelector(section);
};
var renderEntries = () => {
  const { showAllPhases, activePhase } = getCurrentPhase();
  const winnersSection = getSection(PAGE_SECTIONS.WINNERS);
  const featuredEntriesSection = getSection(PAGE_SECTIONS.FEATURED_ENTRIES);
  const allEntriesSection = getSection(PAGE_SECTIONS.ALL_ENTRIES);
  if (showAllPhases) {
    toggleSection(winnersSection, true);
    toggleSection(featuredEntriesSection, true);
    toggleSection(allEntriesSection, true);
    return;
  }
  if (activePhase === "phase-1" /* PHASE_1 */) {
    toggleSection(winnersSection, false);
    toggleSection(featuredEntriesSection, false);
    toggleSection(allEntriesSection, false);
    return;
  }
  if (activePhase === "phase-2" /* PHASE_2 */) {
    toggleSection(winnersSection, false);
    toggleSection(featuredEntriesSection, false);
    toggleSection(allEntriesSection, false);
    return;
  }
  if (activePhase === "phase-3" /* PHASE_3 */) {
    toggleSection(winnersSection, false);
    toggleSection(featuredEntriesSection, true);
    toggleSection(allEntriesSection, true);
    return;
  }
  if (activePhase === "phase-4" /* PHASE_4 */) {
    toggleSection(winnersSection, true);
    toggleSection(featuredEntriesSection, false);
    toggleSection(allEntriesSection, true);
    return;
  }
};
var initSectionRenderer = () => {
  renderEntries();
};
export {
  initSectionRenderer
};
//# sourceMappingURL=section-renderer-Q3IV3BMT.js.map
