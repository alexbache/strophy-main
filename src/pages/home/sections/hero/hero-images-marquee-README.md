# Hero Image Marquee

CSS-only infinite scroll marquee with minimal JS for content duplication.

## Overview

6 rows of horizontally scrolling images:

- **Top 3 rows**: Content manually duplicated in Webflow (HTML)
- **Bottom 3 rows**: Content duplicated via JS (due to Webflow CMS item limits)

## Webflow Setup

### For Top 3 Rows (Manual Duplication)

```html
<div class="intro-marquee marquee-left">
  <!-- Original CMS items -->
  <img src="image1.jpg" />
  <img src="image2.jpg" />

  <!-- Manually duplicate the same items -->
  <img src="image1.jpg" />
  <img src="image2.jpg" />
</div>
```

### For Bottom 3 Rows (JS Duplication)

Add `data-marquee-clone="true"` to rows that need JS cloning:

```html
<div class="intro-marquee marquee-right" data-marquee-clone="true">
  <!-- Original CMS items only -->
  <img src="image3.jpg" />
  <img src="image4.jpg" />
  <!-- JS will clone this entire row -->
</div>
```

## Animation Direction

- **`.marquee-left`**: Scrolls left (0% → -50%)
- **`.marquee-right`**: Scrolls right (-50% → 0%)

Alternate directions for visual interest.

## Performance

- **CSS animations**: GPU-accelerated, 120s duration
- **Minimal JS**: Only runs once on page load to clone bottom 3 rows
- **Above-the-fold optimized**: Fast cloning with no layout shift

## Files

- `hero-marquee.ts` - Handles JS cloning for bottom 3 rows
- `hero-marquee.css` - Pure CSS animations (120s linear infinite)

## How It Works

1. Page loads
2. JS finds elements with `data-marquee-clone="needed"`
3. Clones those rows and appends to parent
4. CSS takes over with infinite scroll animations
5. The `-50%` transform creates seamless loop (scrolls through one full set of content)
