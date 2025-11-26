import "./chunk-JG2TWXUP.js";

// src/utils/handle-external-links.ts
var handleExternalLinks = () => {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && (href.startsWith("http") || href.startsWith("https") || href.includes("://") && !href.includes(window.location.hostname))) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
};
export {
  handleExternalLinks
};
//# sourceMappingURL=handle-external-links-VNDGVRIU.js.map
