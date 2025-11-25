import {
  isPage
} from "./chunk-ISCHIRRL.js";
import "./chunk-JG2TWXUP.js";

// src/pages/entries (single)/entry-cms-item-page.ts
var orderWinnerCMSList = () => {
  if (!isPage(["/winners/*"])) return;
  const SELECTORS = {
    CMS_LIST: '[custom_action="cms_list"]',
    CMS_CATEGORY: "cms-category",
    CMS_POSITION: "cms-position"
  };
  const cmsList = document.querySelector(SELECTORS.CMS_LIST);
  if (!cmsList) {
    console.error("CMS list not found");
    return;
  }
  const items = Array.from(cmsList.children);
  const sortedItems = items.sort((a, b) => {
    const categoryA = a.getAttribute(SELECTORS.CMS_CATEGORY) || "";
    const categoryB = b.getAttribute(SELECTORS.CMS_CATEGORY) || "";
    const positionA = parseInt(a.getAttribute(SELECTORS.CMS_POSITION) || "0", 10);
    const positionB = parseInt(b.getAttribute(SELECTORS.CMS_POSITION) || "0", 10);
    if (categoryA !== categoryB) {
      return categoryA.localeCompare(categoryB);
    }
    return positionA - positionB;
  });
  sortedItems.forEach((item) => {
    cmsList.appendChild(item);
  });
  console.log("Sorted items:", sortedItems);
};
var entryCMSItemPage = () => {
  console.log("Initializing entry page navigation");
  orderWinnerCMSList();
  const nextButton = document.querySelector('[custom_action="btn_next_cms"]');
  const prevButton = document.querySelector('[custom_action="btn_prev_cms"]');
  const list = document.querySelector('[custom_action="cms_list"]');
  if (!list || !nextButton || !prevButton) {
    console.error("CMS elements missing - ", { list, nextButton, prevButton });
    return;
  }
  const pathnames = Array.from(list.querySelectorAll("a")).map((link) => link.pathname).filter(Boolean);
  const currentPath = window.location.pathname;
  const currentIndex = pathnames.indexOf(currentPath);
  const addPreloadLink = (path) => {
    try {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = path;
      link.type = "text/html";
      const existingLink = document.querySelector(`link[href="${path}"]`);
      if (!existingLink) {
        document.head.appendChild(link);
      }
    } catch (error) {
      console.error("Error adding preload link:", error);
    }
  };
  if (currentIndex === 0 && prevButton) {
    prevButton.style.display = "none";
  } else if (prevButton && currentIndex > 0) {
    const prevPath = pathnames[currentIndex - 1];
    prevButton.href = prevPath;
    addPreloadLink(prevPath);
  }
  if (currentIndex === pathnames.length - 1 && nextButton) {
    nextButton.style.display = "none";
  } else if (nextButton && currentIndex >= 0 && currentIndex < pathnames.length - 1) {
    const nextPath = pathnames[currentIndex + 1];
    nextButton.href = nextPath;
    addPreloadLink(nextPath);
  }
};
export {
  entryCMSItemPage
};
//# sourceMappingURL=entry-cms-item-page-WCMKPWWH.js.map
