import { getCurrentPhase } from '../../components/phase-control';

enum PHASES {
  PHASE_1 = 'phase-1',
  PHASE_2 = 'phase-2',
  PHASE_3 = 'phase-3',
  PHASE_4 = 'phase-4',
}

const PAGE_SECTIONS = {
  WINNERS: '#section-winners',
  FEATURED_ENTRIES: '#section-featured-entries',
  ALL_ENTRIES: '#section-all-entries',
};

const toggleSection = (section: HTMLElement, show: boolean) => {
  section.style.display = show ? 'block' : 'none';
};

const getSection = (section: string) => {
  return document.querySelector(section) as HTMLElement;
};

const renderEntries = () => {
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

  if (activePhase === PHASES.PHASE_1) {
    toggleSection(winnersSection, false);
    toggleSection(featuredEntriesSection, false);
    toggleSection(allEntriesSection, false);
    return;
  }

  if (activePhase === PHASES.PHASE_2) {
    toggleSection(winnersSection, false);
    toggleSection(featuredEntriesSection, false);
    toggleSection(allEntriesSection, false);
    return;
  }

  if (activePhase === PHASES.PHASE_3) {
    toggleSection(winnersSection, false);
    toggleSection(featuredEntriesSection, true);
    toggleSection(allEntriesSection, true);
    return;
  }

  if (activePhase === PHASES.PHASE_4) {
    toggleSection(winnersSection, true);
    toggleSection(featuredEntriesSection, false);
    toggleSection(allEntriesSection, true);
    return;
  }
};

const initSectionRenderer = () => {
  renderEntries();
};
export { initSectionRenderer };
