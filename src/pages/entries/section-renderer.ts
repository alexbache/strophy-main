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

/**
 * Checks if phase control has been initialized by looking for the control element
 */
const isPhaseControlReady = (): boolean => {
  const phaseControl = document.querySelector('[data-phase-element="control"]');
  return phaseControl !== null;
};

const renderEntries = () => {
  const { showAllPhases, activePhase } = getCurrentPhase();
  const winnersSection = getSection(PAGE_SECTIONS.WINNERS);
  const featuredEntriesSection = getSection(PAGE_SECTIONS.FEATURED_ENTRIES);
  const allEntriesSection = getSection(PAGE_SECTIONS.ALL_ENTRIES);

  // Safety check: ensure sections exist before toggling
  if (!winnersSection || !featuredEntriesSection || !allEntriesSection) {
    console.error('[SectionRenderer] Some sections not found, skipping render');
    return;
  }

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
    toggleSection(featuredEntriesSection, true);
    toggleSection(allEntriesSection, true);
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

  // Fallback: if phase is not detected or is null/undefined, show all sections
  // This ensures sections are visible if phase detection fails
  console.error('[SectionRenderer] Unknown phase or phase not detected, showing all sections');
  toggleSection(winnersSection, true);
  toggleSection(featuredEntriesSection, true);
  toggleSection(allEntriesSection, true);
};

/**
 * Waits for phase control to be ready before rendering sections
 * Retries up to 10 times with 100ms delay between attempts
 */
const waitForPhaseControlAndRender = async (maxRetries = 10, delay = 100): Promise<void> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (isPhaseControlReady()) {
      renderEntries();
      return;
    }

    // Wait before next attempt
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // If phase control never becomes ready, render anyway (fallback)
  console.error(
    '[SectionRenderer] Phase control not ready after retries, rendering with current state'
  );
  renderEntries();
};

const initSectionRenderer = () => {
  // Wait for phase control to initialize before rendering sections
  waitForPhaseControlAndRender();
};

export { initSectionRenderer };
