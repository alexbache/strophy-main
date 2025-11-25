import "./chunk-JG2TWXUP.js";

// src/pages/home/sections/categories-animation.ts
var SELECTORS = {
  categoryItemList: "#categories-list"
};
var initCategoriesAnimation = () => {
  const categoryItemList = document.querySelector(SELECTORS.categoryItemList);
  if (!categoryItemList) {
    console.error("No category item list found");
    return;
  }
  const categoryItems = categoryItemList.children;
  if (categoryItems.length === 0) {
    console.error("No category items found");
    return;
  }
  const categoryTriggers = [];
  Array.from(categoryItems).forEach((item) => {
    const trigger = item.querySelector(".cat-showcase_title-wrap");
    if (trigger) {
      categoryTriggers.push(trigger);
    }
  });
  if (categoryTriggers.length === 0) {
    console.error("No category triggers found");
    return;
  }
  let activeTrigger = null;
  let activelyHoveredElement = null;
  let lastHoveredElement = null;
  let isProgrammaticEvent = false;
  let fallbackTimer = null;
  const dispatchMouseover = (trigger) => {
    isProgrammaticEvent = true;
    trigger.dispatchEvent(
      new MouseEvent("mouseover", {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
    activeTrigger = trigger;
    isProgrammaticEvent = false;
  };
  const dispatchMouseout = (trigger) => {
    isProgrammaticEvent = true;
    trigger.dispatchEvent(
      new MouseEvent("mouseout", {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
    isProgrammaticEvent = false;
  };
  const startFallbackTimer = () => {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
    }
    fallbackTimer = setTimeout(() => {
      if (!activelyHoveredElement && lastHoveredElement) {
        const firstTrigger2 = categoryTriggers[0];
        const lastTrigger = categoryTriggers[categoryTriggers.length - 1];
        let fallbackTrigger;
        if (lastHoveredElement === lastTrigger) {
          fallbackTrigger = lastTrigger;
        } else {
          fallbackTrigger = firstTrigger2;
        }
        if (activeTrigger) {
          dispatchMouseout(activeTrigger);
        }
        dispatchMouseover(fallbackTrigger);
      }
    }, 5);
  };
  categoryTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseover", () => {
      if (isProgrammaticEvent) {
        return;
      }
      activelyHoveredElement = trigger;
      lastHoveredElement = trigger;
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      if (activeTrigger !== trigger) {
        if (activeTrigger) {
          dispatchMouseout(activeTrigger);
        }
        dispatchMouseover(trigger);
      }
    });
    trigger.addEventListener("mouseout", () => {
      if (isProgrammaticEvent) {
        return;
      }
      activelyHoveredElement = null;
      startFallbackTimer();
    });
  });
  const firstTrigger = categoryTriggers[0];
  if (firstTrigger) {
    dispatchMouseover(firstTrigger);
    lastHoveredElement = firstTrigger;
  }
};
var categories_animation_default = initCategoriesAnimation;
export {
  categories_animation_default as default
};
//# sourceMappingURL=categories-animation-5A3B5VEE.js.map
