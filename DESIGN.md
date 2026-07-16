---
name: Neutral Luxury
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#1f1f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#343536'
  on-surface: '#e4e2e4'
  on-surface-variant: '#c5c6cd'
  inverse-surface: '#e4e2e4'
  inverse-on-surface: '#303032'
  outline: '#8f9097'
  outline-variant: '#44474d'
  surface-tint: '#b9c7e4'
  primary: '#b9c7e4'
  on-primary: '#233148'
  primary-container: '#0a192f'
  on-primary-container: '#74829d'
  inverse-primary: '#515f78'
  secondary: '#bcc7de'
  on-secondary: '#263143'
  secondary-container: '#3e495d'
  on-secondary-container: '#aeb9d0'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#001e11'
  on-tertiary-container: '#009466'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131315'
  on-background: '#e4e2e4'
  surface-variant: '#343536'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  container-max: 1440px
  sidebar-width: 280px
  sidebar-collapsed: 80px
---

## Brand & Style

The design system is engineered to evoke a sense of **Functional Elegance**. It targets high-net-worth individuals and corporate tax professionals who require a high-density information environment that feels calm, premium, and authoritative. 

The aesthetic is a hybrid of **Corporate Modern** and **Glassmorphism**, leaning heavily into a "dark room" ambiance where critical financial data is the primary light source. The brand personality is defined by:
- **Trustworthiness:** Precise alignment and structured information density.
- **Intelligence:** Context-aware layouts that prioritize clarity over decoration.
- **Premium Quality:** Subtle use of depth, refined typography, and a restrained color application that mirrors high-end physical hardware.

## Colors

The palette utilizes a "Deep Sea" foundation to reduce eye strain during prolonged financial analysis.

- **Primary (#0A192F):** The foundational "Ink" layer used for the main background.
- **Secondary (#1E293B):** The "Slate" layer used for modular containers and the sidebar.
- **Emerald (#10B981):** Reserved strictly for growth, wealth accumulation, and "Safe" status indicators.
- **Crimson (#EF4444):** Reserved for debt alerts, tax liabilities, and critical errors.
- **Accents:** Use low-opacity tints of Emerald (10-15%) for subtle background glows behind positive data points.

## Typography

This design system prioritizes legibility of complex numerical data. 
- **Public Sans** provides a sturdy, institutional feel for headers.
- **Inter** handles the bulk of UI copy, utilizing its high x-height for readability in dark mode.
- **JetBrains Mono** is employed specifically for financial figures, tax IDs, and currency values to ensure tabular alignment (lining figures), allowing users to compare vertical columns of data at a glance.

## Layout & Spacing

The layout follows a **Bento Box** modularity, where information is compartmentalized into logical "tiles" or widgets.
- **Grid:** A 12-column fluid grid for the main content area, within a max-width container of 1440px.
- **Gaps:** Use a consistent 24px (md) gap between bento modules to maintain a clean, organized appearance.
- **Sidebar:** A collapsible navigation system on the left. When collapsed, it reveals only icons; when expanded, it provides full labels and nested category support.
- **Margins:** Page-level margins are 32px on desktop, scaling down to 16px on mobile.

## Elevation & Depth

To achieve "Neutral Luxury," depth is created through **Tonal Layering** rather than heavy shadows.
- **Level 0 (Background):** #0A192F.
- **Level 1 (Bento Cards):** #1E293B with a 1px border of `white / 0.05` for definition.
- **Level 2 (Modals/Popovers):** #2D3748 with a subtle 20px blur (Glassmorphism) and a soft #000000 (40% opacity) shadow.
- **Interactive States:** On hover, cards should subtly lift using a `y-4` translate and a soft glow of the primary accent color.

## Shapes

The shape language is "Soft-Geometric." 
- **Modules/Cards:** Use 8px (0.5rem) corner radius to strike a balance between professional rigidity and modern approachability.
- **Input Fields:** Match the 8px radius.
- **Buttons:** Small buttons use 4px, while primary action buttons use 8px. Avoid pill shapes to maintain the "enterprise" aesthetic.

## Components

- **Bento Cards:** The core unit of the UI. Must include a header area for a title and optional "Info" icon. Backgrounds are #1E293B.
- **Primary Buttons:** Solid Emerald (#10B981) with white text for "Growth" actions. For neutral actions, use Slate background with a subtle border.
- **Input Fields:** Darker than the card background (#0F172A) with a 1px Slate border. On focus, the border glows with a 1px Emerald or Slate outline.
- **Data Tables:** Zebra striping is discouraged. Use 1px horizontal dividers in `white / 0.05`. Header cells should use the `label-caps` typography style.
- **Chips/Badges:** Small, low-saturation backgrounds with high-saturation text (e.g., a dark red background with bright Crimson text for "Debt" status).
- **Collapsible Sidebar:** Features high-contrast active states using a vertical Emerald bar (4px width) on the left edge of the active menu item.
