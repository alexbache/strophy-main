import {
  handleResize
} from "./chunk-TLP63QE5.js";
import {
  isDesktop
} from "./chunk-UQEN3MJC.js";
import "./chunk-JG2TWXUP.js";

// src/pages/home/sections/inspiration.ts
var SELECTORS = {
  imageRowList: "#inspiration-image-row-list",
  header: "#inspiration-header",
  imageRow: '[slider-element="image-row"]',
  nextButton: '[slider-element="btn-next"]',
  prevButton: '[slider-element="btn-prev"]'
};
var inspirationImageRowPadding = () => {
  const imageRowList = document.querySelector(SELECTORS.imageRowList);
  const header = document.querySelector(SELECTORS.header);
  const firstHeaderChild = header?.firstElementChild;
  if (!imageRowList?.firstElementChild || !firstHeaderChild) {
    console.error("Required inspiration elements not found");
    return;
  }
  const updatePadding = () => {
    const leftOffset = firstHeaderChild.getBoundingClientRect().left;
    imageRowList.firstElementChild.style.paddingLeft = `${leftOffset}px`;
  };
  updatePadding();
  window.addEventListener("resize", updatePadding);
  return () => window.removeEventListener("resize", updatePadding);
};
var inspirationImageSlider = () => {
  const imageSlider = document.querySelector(SELECTORS.imageRow);
  const nextButton = document.querySelector(SELECTORS.nextButton);
  const prevButton = document.querySelector(SELECTORS.prevButton);
  const header = document.querySelector(SELECTORS.header);
  if (!imageSlider || !nextButton || !prevButton) {
    throw new Error("Required slider elements not found");
  }
  const images = imageSlider.querySelectorAll("img");
  let currentImageIndex = 0;
  let ghostImage = null;
  const setupGhostImage = () => {
    const leftAlignmentPoint = header?.firstElementChild?.getBoundingClientRect().left;
    if (!leftAlignmentPoint) return null;
    const lastImageWidth = images[images.length - 1].getBoundingClientRect().width;
    const imageGap = parseInt(window.getComputedStyle(imageSlider).gap);
    const ghostImageWidth = window.innerWidth - leftAlignmentPoint - lastImageWidth - imageGap;
    if (ghostImage) {
      if (isDesktop()) {
        ghostImage.style.minWidth = `${ghostImageWidth}px`;
      } else {
        ghostImage.style.width = `20px`;
      }
      return ghostImage;
    }
    const newGhostImage = document.createElement("div");
    if (isDesktop()) {
      newGhostImage.style.minWidth = `${ghostImageWidth}px`;
    } else {
      newGhostImage.style.width = `20px`;
    }
    newGhostImage.style.height = "1px";
    newGhostImage.style.visibility = "hidden";
    return newGhostImage;
  };
  ghostImage = setupGhostImage();
  if (ghostImage) {
    imageSlider.appendChild(ghostImage);
  }
  const scrollToImage = (index) => {
    const currentImage = images[index];
    const leftAlignmentPoint = header?.firstElementChild?.getBoundingClientRect().left ?? 0;
    const scrollPosition = currentImage.offsetLeft - leftAlignmentPoint;
    imageSlider.scrollTo({
      left: scrollPosition,
      behavior: "smooth"
    });
  };
  const handleNext = () => {
    currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    scrollToImage(currentImageIndex);
  };
  const handlePrev = () => {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    scrollToImage(currentImageIndex);
  };
  const reinitialize = () => {
    setupGhostImage();
    scrollToImage(currentImageIndex);
  };
  nextButton.addEventListener("click", handleNext);
  prevButton.addEventListener("click", handlePrev);
  handleResize(reinitialize, 100, {
    widthOnly: true,
    threshold: 10
  });
};
var initInspirationImageSlider = () => {
  inspirationImageRowPadding();
  inspirationImageSlider();
};
export {
  initInspirationImageSlider
};
//# sourceMappingURL=inspiration-HQYBWKIY.js.map
