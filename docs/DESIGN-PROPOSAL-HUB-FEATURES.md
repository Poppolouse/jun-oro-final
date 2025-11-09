
## Proposed Design for New Features

### A. Search Bar

*   **Placement:** Below the main header (`h1` and `p.subtitle`), spanning the content width.
*   **Structure:** A simple `input` field.
*   **Styling (Neumorphic):**
    *   `background`: `var(--card)` (`#EEEAE4`)
    *   `border-radius`: `var(--radius)` (`18px`)
    *   `padding`: `12px 20px`
    *   `box-shadow`: `inset 2px 2px 5px rgba(255,255,255,0.5), inset -2px -2px 5px rgba(0,0,0,0.1)` (inset shadow for a "pressed in" look)
    *   `border`: `none`
    *   `font-size`: `16px`
    *   `color`: `var(--text)` (`#2D2A26`)
    *   `placeholder color`: `var(--text-secondary)` (`#6B6661`)
    *   `width`: `100%` (within the `.page` max-width)
    *   `margin-bottom`: `24px`

### B. User Button with Dropdown Menu

*   **Placement:** Top right corner of the `header`. This will require adjusting the `header`'s layout to use flexbox for proper positioning.
*   **User Button Styling (Neumorphic):**
    *   `background`: `var(--card)` (`#EEEAE4`)
    *   `border-radius`: `12px`
    *   `padding`: `8px 16px`
    *   `box-shadow`: `5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(255,255,255,0.7)` (outer shadow for a "raised" look)
    *   `transition`: `transform 350ms ease-in-out, box-shadow 350ms ease-in-out`
    *   `font-size`: `16px`
    *   `color`: `var(--text)`
    *   `cursor`: `pointer`
    *   **Hover state:** `transform: translateY(-2px); box-shadow: 6px 6px 12px rgba(0,0,0,0.12), -6px -6px 12px rgba(255,255,255,0.75);`
*   **Dropdown Menu Styling (Neumorphic):**
    *   `background`: `var(--card)` (`#EEEAE4`)
    *   `border-radius`: `var(--radius)` (`18px`)
    *   `box-shadow`: `5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(255,255,255,0.7)`
    *   `position`: `absolute` (relative to the button)
    *   `top`: `calc(100% + 10px)`
    *   `right`: `0`
    *   `padding`: `10px 0`
    *   `min-width`: `150px`
    *   `z-index`: `10`
    *   `list-style`: `none`
    *   `margin`: `0`
*   **Dropdown Item Styling:**
    *   `padding`: `8px 16px`
    *   `color`: `var(--text)`
    *   `text-decoration`: `none`
    *   `display`: `block`
    *   **Hover state:** `background: rgba(0,0,0,0.05);`

Please let me know if this design proposal meets your expectations or if you'd like any adjustments.
