# Changelog

All notable changes are documented here.

## 1.1.1 - 2026-10-08

- Mapped every desktop overlay to its mobile drawer form, adding context menus, toolbar overflow, pickers, filters, share, preview cards, command palettes, detail panes, side navigation, and multi-step flows.
- Listed the surfaces that stay out of drawers: tooltips, long forms and editors, and media lightboxes.
- Fixed packaging on Linux CI, which failed because `ditto` only exists on macOS.

## 1.1.0 - 2026-10-08

- Replaced Vaul with Base UI Drawer as the house mobile drawer.
- Made the responsive overlay rule explicit: drawers instead of dialogs and dropdowns on mobile, regular dialogs and dropdowns on desktop.

## 1.0.2 - 2026-09-01

- Made query parameters the default owner for recoverable UI state.

## 1.0.1 - 2026-09-01

- Added the preferred agent-copy install prompt to the README.

## 1.0.0 - 2026-09-01

- Initial public release of the Frontend Standards skill.
