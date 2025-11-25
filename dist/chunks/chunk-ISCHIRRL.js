// src/utils/is-page.ts
var isPage = (path) => {
  const currentPath = window.location.pathname;
  if (Array.isArray(path)) {
    return path.some((p) => {
      if (p.endsWith("*")) {
        const basePath = p.slice(0, -1);
        return currentPath.startsWith(basePath);
      }
      return currentPath === p;
    });
  }
  if (path.endsWith("*")) {
    const basePath = path.slice(0, -1);
    return currentPath.startsWith(basePath);
  }
  return currentPath === path;
};
if (isPage("/about")) {
}
if (isPage(["/about", "/contact"])) {
}
if (isPage("/work/*")) {
}

export {
  isPage
};
//# sourceMappingURL=chunk-ISCHIRRL.js.map
