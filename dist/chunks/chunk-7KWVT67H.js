import {
  handleResize
} from "./chunk-TLP63QE5.js";
import {
  gsapWithCSS
} from "./chunk-6KMKHOBV.js";
import {
  isTablet
} from "./chunk-UQEN3MJC.js";

// src/pages/home/sections/hero/hero-images-marquee.ts
var heroImageMarquee = () => {
  const heroSection = document.querySelector("[data-section='hero']");
  if (!heroSection) {
    console.error('Hero section not found, make sure [data-section="hero"] exists');
    return;
  }
  const marqueeRowsNeedingClone = heroSection.querySelectorAll('[data-marquee-clone="true"]');
  if (!marqueeRowsNeedingClone.length) {
    console.error('No rows needing clone found, make sure [data-marquee-clone="true"] exists');
    return;
  }
  marqueeRowsNeedingClone.forEach((row) => {
    const clone = row.cloneNode(true);
    row.parentElement?.appendChild(clone);
  });
};
var heroIntroAnimation = () => {
  try {
    console.log("\u{1F3AC} [Hero Animation] Starting hero intro animation");
    const heroSection = document.querySelector("[data-section='hero']");
    if (!heroSection) {
      console.error("\u274C [Hero Animation] Hero section not found for intro animation");
      return;
    }
    console.log("\u2705 [Hero Animation] Hero section found");
    const logoCloud = heroSection.querySelector('[data-fade-in="logo-cloud"]');
    const textMarquee = heroSection.querySelector('[data-fade-in="text-marquee"]');
    const imageMarqueeRows = heroSection.querySelectorAll('[data-fade-in="image-marquee-row"]');
    console.log("\u{1F4E6} [Hero Animation] Elements found:", {
      // heading: !!heading,
      logoCloud: !!logoCloud,
      textMarquee: !!textMarquee,
      imageMarqueeRows: imageMarqueeRows.length
    });
    const logoCloudLoader = document.querySelector(".hero-logo-cloud-loader");
    const textMarqueeLoader = document.querySelector(".hero-text-marquee-loader");
    const imageMarqueeLoader = document.querySelector(".hero-image-marquee-loader");
    console.log("\u{1F3AD} [Hero Animation] Loaders found:", {
      // headingLoader: !!headingLoader,
      logoCloudLoader: !!logoCloudLoader,
      textMarqueeLoader: !!textMarqueeLoader,
      imageMarqueeLoader: !!imageMarqueeLoader
    });
    gsapWithCSS.set([logoCloud, textMarquee, imageMarqueeRows], { opacity: 0, y: 20 });
    console.log("\u{1F3A8} [Hero Animation] Initial states set (opacity: 0, y: 20)");
    console.log("\u{1F680} [Hero Animation] PHASE 1: Starting immediate reveal (logo cloud)");
    const tl = gsapWithCSS.timeline({ delay: 0 });
    tl.to(
      logoCloud,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        onStart: () => console.log("  \u23F3 Fading in logo cloud"),
        onComplete: () => console.log("  \u2705 Logo cloud visible")
      },
      0
    ).to(
      logoCloudLoader,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          console.log("  \u2705 Logo cloud loader hidden");
          if (logoCloudLoader) logoCloudLoader.style.display = "none";
        }
      },
      0
    );
    const firstTwoRows = Array.from(imageMarqueeRows).slice(0, 2);
    const firstTwoRowsImages = [];
    firstTwoRows.forEach((row) => {
      const rowImages = row.querySelectorAll("img");
      firstTwoRowsImages.push(...Array.from(rowImages));
    });
    console.log(
      `\u{1F4F8} [Hero Animation] PHASE 2: Waiting for ${firstTwoRowsImages.length} images from first 2 rows to load`
    );
    const imagePromises = firstTwoRowsImages.map((img, index) => {
      return new Promise((resolve) => {
        if (img.complete) {
          console.log(`  \u2705 Image ${index + 1}/${firstTwoRowsImages.length} already loaded`);
          resolve(true);
        } else {
          img.addEventListener("load", () => {
            console.log(`  \u2705 Image ${index + 1}/${firstTwoRowsImages.length} loaded`);
            resolve(true);
          });
          img.addEventListener("error", () => {
            console.log(`  \u26A0\uFE0F Image ${index + 1}/${firstTwoRowsImages.length} failed to load`);
            resolve(true);
          });
        }
      });
    });
    Promise.all(imagePromises).then(() => {
      console.log("\u{1F389} [Hero Animation] All first 2 rows images loaded! Starting marquee reveal");
      const currentTime = tl.duration();
      tl.to(
        textMarquee,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          onStart: () => console.log("  \u23F3 Fading in text marquee"),
          onComplete: () => console.log("  \u2705 Text marquee visible")
        },
        currentTime
      ).to(
        textMarqueeLoader,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            console.log("  \u2705 Text marquee loader hidden");
            if (textMarqueeLoader) textMarqueeLoader.style.display = "none";
          }
        },
        currentTime
      );
      tl.to(
        imageMarqueeRows,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          onStart: () => console.log("  \u23F3 Fading in image marquee rows (with stagger)"),
          onComplete: () => console.log("\u{1F38A} [Hero Animation] Animation complete!")
        },
        currentTime + 0.15
      ).to(
        imageMarqueeLoader,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            console.log("  \u2705 Image marquee loader hidden");
            if (imageMarqueeLoader) imageMarqueeLoader.style.display = "none";
          }
        },
        currentTime + 0.15
      );
    });
  } catch (err) {
    console.error("\u274C [Hero Animation] Error in heroIntroAnimation:", err);
  }
};
var LogoMarquee = () => {
  const initMarquee = () => {
    try {
      const SELECTORS = {
        marqueeRowInner: '[logo-marquee-element="inner-row"]',
        marqueeRow: '[logo-marquee-element="outer-row"]'
      };
      const marqueeRows = document.querySelectorAll(SELECTORS.marqueeRow);
      const marqueeRowInners = document.querySelectorAll(SELECTORS.marqueeRowInner);
      if (!isTablet()) {
        marqueeRows.forEach((marqueeRow) => {
          const clonedElement = marqueeRow.querySelector('[data-clone="true"]');
          if (clonedElement) {
            try {
              clonedElement.remove();
            } catch (err) {
              console.error("Error removing cloned element:", err);
            }
          }
          gsapWithCSS.killTweensOf(`${SELECTORS.marqueeRow} > *`);
          try {
            Array.from(marqueeRow.children).forEach((row) => {
              gsapWithCSS.set(row, {
                xPercent: 0
              });
            });
          } catch (err) {
            console.error("Error resetting row positions:", err);
          }
        });
        return;
      }
      if (!marqueeRows.length || !marqueeRowInners.length) {
        console.error(
          'No marquee rows found. Please check that elements with marquee-element="logo-list-wrapper" exist.',
          {
            marqueeRows,
            marqueeRowInners
          }
        );
        throw new Error("Marquee rows not found");
      }
      marqueeRows.forEach((marqueeRow, index) => {
        const marqueeRowInner = marqueeRowInners[index];
        const clonedElement = marqueeRow.querySelector('[data-clone="true"]');
        if (isTablet() && !clonedElement) {
          try {
            const marqueeRowInnerClone = marqueeRowInner.cloneNode(true);
            marqueeRowInnerClone.setAttribute("data-clone", "true");
            marqueeRow.appendChild(marqueeRowInnerClone);
            Array.from(marqueeRow.children).forEach((row) => {
              gsapWithCSS.to(row, {
                xPercent: -100,
                ease: "none",
                duration: 90,
                repeat: -1
              });
            });
          } catch (err) {
            console.error("Error creating mobile marquee effect:", err);
          }
        }
      });
    } catch (err) {
      console.error("Error in initMarquee:", err);
    }
  };
  try {
    initMarquee();
  } catch (err) {
    console.error("Error during initial marquee setup:", err);
  }
  handleResize(initMarquee, 100, {
    widthOnly: true,
    threshold: 10
  });
};
var initHeroMarquee = () => {
  heroImageMarquee();
  LogoMarquee();
};
if (typeof window !== "undefined") {
  const checkAndRunHeroAnimation = () => {
    const heroSection = document.querySelector("[data-section='hero']");
    if (heroSection) {
      heroIntroAnimation();
    } else {
      const observer = new MutationObserver(() => {
        const heroSection2 = document.querySelector("[data-section='hero']");
        if (heroSection2) {
          observer.disconnect();
          heroIntroAnimation();
        }
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
      setTimeout(() => observer.disconnect(), 5e3);
    }
  };
  if (document.body) {
    checkAndRunHeroAnimation();
  } else {
    document.addEventListener("DOMContentLoaded", checkAndRunHeroAnimation);
  }
}

export {
  LogoMarquee,
  initHeroMarquee
};
//# sourceMappingURL=chunk-7KWVT67H.js.map
