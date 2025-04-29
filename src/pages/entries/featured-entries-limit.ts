const featuredEntriesList = document.querySelector('#featured-entries-list') as HTMLElement;

const featuredEntriesLimit = 3;

const renderFeaturedEntries = () => {
  const featuredEntries = Array.from(featuredEntriesList.children) as HTMLElement[];

  // Hide all entries initially
  featuredEntries.forEach((entry) => {
    entry.style.display = 'none';
  });

  // Get random indices
  const indices = new Set<number>();
  while (indices.size < featuredEntriesLimit) {
    indices.add(Math.floor(Math.random() * featuredEntries.length));
  }

  // Show only the randomly selected entries
  Array.from(indices).forEach((index) => {
    featuredEntries[index].style.display = 'block';
  });
};

const initFeaturedEntriesLimit = () => {
  renderFeaturedEntries();
};

export { initFeaturedEntriesLimit };
