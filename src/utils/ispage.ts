// Check current pathname
export const isPage = (path: string | string[]) => {
  const currentPath = window.location.pathname;

  if (Array.isArray(path)) {
    return path.some((p) => {
      if (p.endsWith('*')) {
        const basePath = p.slice(0, -1);
        return currentPath.startsWith(basePath);
      }
      return currentPath === p;
    });
  }

  if (path.endsWith('*')) {
    const basePath = path.slice(0, -1);
    return currentPath.startsWith(basePath);
  }

  return currentPath === path;
};

// Usage
if (isPage('/about')) {
  // Run code for about page
}

// Or for multiple pages
if (isPage(['/about', '/contact'])) {
  // Run code for these pages
}

// Or with wildcards
if (isPage('/work/*')) {
  // Run code for any page under /work/
}
