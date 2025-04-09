# Webflow Filter System Implementation Guide

## Overview

A simple filtering system for Webflow collection lists. Supports multiple filter groups on the same page and allows any element to act as a filter trigger.

## Setup Instructions

### 1. Required Elements

You'll need:

- A list of filter triggers (any clickable elements)
- One or more collection lists to be filtered

### 2. Adding Data Attributes

#### Filter Triggers Group

```html
<ul data-filter-button-list-id="products">
  <li data-filter-value="electronics">Electronics</li>
  <li data-filter-value="clothing">Clothing</li>
</ul>
```

- Add `data-filter-button-list-id` to the container with a unique identifier (e.g., "products")
- Add `data-filter-value` to any clickable element that should trigger filtering

#### Collection List

```html
<ul data-filter-list-id="products">
  <li data-filter-match="electronics">iPhone</li>
  <li data-filter-match="clothing">T-Shirt</li>
</ul>
```

- Add `data-filter-list-id` matching your trigger group's ID
- Add `data-filter-match` to each collection item

### 3. Setting Up Collection Items

1. In your Webflow collection, create a field for categories (e.g., "Category")
2. In your collection list settings, bind the `data-filter-match` attribute to your category field
3. Ensure the values in your collection match the `data-filter-value` on your triggers

### 4. Multiple Filter Groups

Create separate groups by using different IDs. Elements with matching IDs will work together:

```html
<!-- Products Filter Group -->
<div data-filter-button-list-id="products">
  <button data-filter-value="electronics">Electronics</button>
  <button data-filter-value="clothing">Clothing</button>
</div>

<ul data-filter-list-id="products">
  <!-- Products collection list -->
</ul>

<!-- Blog Filter Group -->
<nav data-filter-button-list-id="blog">
  <a data-filter-value="news">News</a>
  <a data-filter-value="updates">Updates</a>
</nav>

<ul data-filter-list-id="blog">
  <!-- Blog collection list -->
</ul>
```

### 5. Flexible Implementation

- Any element can be a filter trigger - buttons, links, divs, etc.
- Triggers and lists can be placed anywhere on the page
- Multiple collection lists can share the same trigger group
- Trigger groups can use any HTML structure

### Important Notes

1. **Matching Values**: Your `data-filter-value` must exactly match the corresponding `data-filter-match` values
2. **Unique IDs**: Use different IDs for separate filter groups
3. **Initial State**: The first trigger in each group will be automatically selected on page load
4. **Styling**: The 'active' class is added to the currently selected trigger

### Troubleshooting

If filters aren't working:

1. Check that all data attributes are spelled correctly
2. Verify that IDs match between trigger groups and filter lists
3. Ensure filter values match exactly with filter match values
4. Check browser console for any error messages

### Example with Different Elements

```html
<!-- Using links -->
<nav data-filter-button-list-id="gallery">
  <a data-filter-value="nature">Nature</a>
  <a data-filter-value="urban">Urban</a>
</nav>

<!-- Using buttons -->
<div data-filter-button-list-id="team">
  <button data-filter-value="management">Management</button>
  <button data-filter-value="developers">Developers</button>
</div>

<!-- Using custom elements -->
<div data-filter-button-list-id="portfolio">
  <div class="filter-chip" data-filter-value="websites">Websites</div>
  <div class="filter-chip" data-filter-value="apps">Apps</div>
</div>
```

The main changes in this updated guide:

1. Simplified attribute structure
2. Removed button-specific terminology
3. Added examples of different element types
4. Emphasized flexibility in implementation
5. Removed redundant container references
6. Made the matching system clearer

Would you like me to clarify or expand any section further?
