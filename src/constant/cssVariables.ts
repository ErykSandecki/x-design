/* eslint-disable sort-keys */
const prefix = '--xd';

/**
 * Z-indexes for [Page Builder] components
 */
const XD_PAGE_BUILDER_ZINDEX_EVENTS = `${prefix}-page-builder-zindex-events`;
const XD_PAGE_BUILDER_ZINDEX_ELEMENT = `${prefix}-page-builder-zindex-element`;
const XD_PAGE_BUILDER_ZINDEX_ELEMENT_ACTIVE = `${prefix}-page-builder-zindex-element-active`;
const XD_PAGE_BUILDER_ZINDEX_ELEMENT_MOVING = `${prefix}-page-builder-zindex-element-moving`;
const XD_PAGE_BUILDER_ZINDEX_ELEMENT_ANCHOR = `${prefix}-page-builder-zindex-element-anchor`;
const XD_PAGE_BUILDER_ZINDEX_MULTIPLE_AREA = `${prefix}-page-builder-zindex-multiple-area`;
const XD_PAGE_BUILDER_ZINDEX_OVERLAY_CONTAINER = `${prefix}-page-builder-zindex-overlay-container`;

export const cssVariables = {
  XD_PAGE_BUILDER_ZINDEX_EVENTS,
  XD_PAGE_BUILDER_ZINDEX_ELEMENT,
  XD_PAGE_BUILDER_ZINDEX_ELEMENT_ACTIVE,
  XD_PAGE_BUILDER_ZINDEX_ELEMENT_MOVING,
  XD_PAGE_BUILDER_ZINDEX_ELEMENT_ANCHOR,
  XD_PAGE_BUILDER_ZINDEX_MULTIPLE_AREA,
  XD_PAGE_BUILDER_ZINDEX_OVERLAY_CONTAINER,
} as const;
