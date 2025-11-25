import {
  gsapWithCSS
} from "./chunk-6KMKHOBV.js";
import "./chunk-JG2TWXUP.js";

// src/pages/home/sections/cash-prizes.ts
var cashPrizes = () => {
  const SELECTORS = {
    grandTotal: "#prizes-grand-total",
    podium1: "#podium-1",
    podium2: "#podium-2",
    podium3: "#podium-3",
    podiumInner: '[podium-element="inner"]',
    podiumAmount: '[podium-element="amount"]',
    podiumContainer: "#podium-container"
  };
  const grandTotalElement = document.querySelector(SELECTORS.grandTotal);
  const podium1Inner = document.querySelector(`${SELECTORS.podium1} ${SELECTORS.podiumInner}`);
  const podium2Inner = document.querySelector(`${SELECTORS.podium2} ${SELECTORS.podiumInner}`);
  const podium3Inner = document.querySelector(`${SELECTORS.podium3} ${SELECTORS.podiumInner}`);
  const podium1Amount = document.querySelector(`${SELECTORS.podium1} ${SELECTORS.podiumAmount}`);
  const podium2Amount = document.querySelector(`${SELECTORS.podium2} ${SELECTORS.podiumAmount}`);
  const podium3Amount = document.querySelector(`${SELECTORS.podium3} ${SELECTORS.podiumAmount}`);
  const podiumContainer = document.querySelector(SELECTORS.podiumContainer);
  if (!podium1Inner || !podium2Inner || !podium3Inner || !podium1Amount || !podium2Amount || !podium3Amount || !podiumContainer) {
    console.error("One or more podium elements not found");
    return;
  }
  let podiumsHasAnimated = false;
  let totalHasAnimated = false;
  if (!grandTotalElement) {
    console.error("Prizes grand total element not found");
    return;
  }
  const targetValue = parseInt(grandTotalElement.textContent?.replace(/[^0-9]/g, "") || "0");
  const podiumObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !podiumsHasAnimated) {
          podiumsHasAnimated = true;
          gsapWithCSS.fromTo(
            podium1Inner,
            { height: "0%" },
            { height: "90%", duration: 1.5, ease: "power2.out" }
          );
          gsapWithCSS.fromTo(
            podium2Inner,
            { height: "0%" },
            { height: "70%", duration: 1.5, ease: "power2.out" }
          );
          gsapWithCSS.fromTo(
            podium3Inner,
            { height: "0%" },
            { height: "50%", duration: 1.5, ease: "power2.out" }
          );
          const addHoverAnimation = (element, baseHeight) => {
            element.addEventListener("mouseenter", () => {
              gsapWithCSS.to(element, {
                height: `${parseInt(baseHeight) + 10}%`,
                duration: 0.3,
                ease: "power2.out"
              });
            });
            element.addEventListener("mouseleave", () => {
              gsapWithCSS.to(element, {
                height: baseHeight,
                duration: 0.3,
                ease: "power2.out"
              });
            });
          };
          addHoverAnimation(podium1Inner, "90%");
          addHoverAnimation(podium2Inner, "70%");
          addHoverAnimation(podium3Inner, "50%");
          const animatePodiumAmount = (element) => {
            const targetValue2 = parseInt(element.textContent?.replace(/[^0-9]/g, "") || "0");
            gsapWithCSS.fromTo(
              element,
              {
                textContent: "0",
                duration: 0
              },
              {
                textContent: targetValue2,
                duration: 2,
                ease: "power1.out",
                snap: { textContent: 1 },
                onUpdate: function() {
                  const value = Math.floor(
                    gsapWithCSS.getProperty(this.targets()[0], "textContent")
                  );
                  element.textContent = `$${value.toLocaleString()}`;
                }
              }
            );
          };
          animatePodiumAmount(podium1Amount);
          animatePodiumAmount(podium2Amount);
          animatePodiumAmount(podium3Amount);
        }
      });
    },
    {
      threshold: 0.3
      // Add threshold to ensure better triggering
    }
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !totalHasAnimated) {
          totalHasAnimated = true;
          gsapWithCSS.fromTo(
            grandTotalElement,
            {
              textContent: "0",
              duration: 0
            },
            {
              textContent: targetValue,
              duration: 3,
              ease: "power1.out",
              snap: { textContent: 1 },
              onUpdate: function() {
                const value = Math.floor(
                  gsapWithCSS.getProperty(this.targets()[0], "textContent")
                );
                grandTotalElement.textContent = `$${value.toLocaleString()}`;
              }
            }
          );
        }
      });
    },
    {
      threshold: 0.3
    }
  );
  const cleanup = () => {
    podiumObserver.disconnect();
    observer.disconnect();
  };
  podiumObserver.observe(podiumContainer);
  observer.observe(grandTotalElement);
  window.addEventListener("unload", cleanup);
  return cleanup;
};
var initCashPrizes = () => {
  cashPrizes();
};
export {
  initCashPrizes
};
//# sourceMappingURL=cash-prizes-6V4JNYTI.js.map
