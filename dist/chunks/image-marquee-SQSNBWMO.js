import {
  handleResize
} from "./chunk-TLP63QE5.js";
import {
  gsapWithCSS
} from "./chunk-6KMKHOBV.js";
import "./chunk-JG2TWXUP.js";

// src/components/image-marquee.ts
var imageMarquee = () => {
  try {
    const marqueeRows = document.querySelectorAll('[image-marquee="row"]');
    if (!marqueeRows || marqueeRows.length === 0) {
      console.error("No marquee rows found.");
      throw new Error("Marquee rows not found");
    }
    const updateRowAnimation = (row, image, imageOffset) => {
      if (!image.complete || image.naturalWidth === 0) {
        image.addEventListener("load", () => updateRowAnimation(row, image, imageOffset));
        return;
      }
      const imageWidth = image.clientWidth;
      if (imageWidth === 0) {
        console.warn("Image width is 0, delaying animation");
        setTimeout(() => updateRowAnimation(row, image, imageOffset), 100);
        return;
      }
      const initialX = imageOffset ? -imageWidth * 0.65 : 0;
      gsapWithCSS.killTweensOf(row);
      gsapWithCSS.to(row, {
        x: -imageWidth + initialX,
        duration: 120,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsapWithCSS.utils.unitize((x) => parseFloat(x) % imageWidth)
        }
      });
      if (imageOffset) {
        gsapWithCSS.set(row, { x: initialX });
      }
    };
    marqueeRows.forEach((row) => {
      let imageOffset = false;
      const imageOffsetAttr = row.getAttribute("image-offset");
      if (imageOffsetAttr) {
        imageOffset = true;
      }
      console.log("imageOffset", imageOffset);
      const image = row.querySelector("img");
      if (!image) {
        console.error("No image found in marquee row");
        return;
      }
      const clone = image.cloneNode(true);
      row.appendChild(clone);
      updateRowAnimation(row, image, imageOffset);
      handleResize(() => updateRowAnimation(row, image, imageOffset), 100, {
        widthOnly: true,
        threshold: 10
      });
    });
  } catch (error) {
    console.error("Error in imageMarquee:", error);
  }
};
var initPrizesBgMarquee = () => {
  imageMarquee();
};
export {
  initPrizesBgMarquee
};
//# sourceMappingURL=image-marquee-SQSNBWMO.js.map
