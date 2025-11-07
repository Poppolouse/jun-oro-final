# Design System - Neumorphism Portfolio

## Overview

This design system implements a modern glassmorphism and neon aesthetic for a portfolio website. It combines translucent glass effects with vibrant neon accents to create a futuristic, professional appearance.

## Color Palette

### Background Colors
- **Primary Background**: `#0a0e27` (Deep navy)
- **Secondary Background**: `#1a0f2e` (Dark purple)
- **Background Gradient**: Linear gradient from primary to secondary at 135°

### Glass Effects
- **Glass Background**: `rgba(255, 255, 255, 0.05)` (5% white opacity)
- **Glass Border**: `rgba(255, 255, 255, 0.1)` (10% white opacity)
- **Backdrop Blur**: `20px` for glass morphism effect

### Neon Colors
- **Primary Neon**: `#00ff88` (Bright green) - Used for primary actions, links, highlights
- **Secondary Neon**: `#a855f7` (Purple) - Used for secondary elements, accents
- **Accent Neon**: `#ff3366` (Pink) - Used for alerts, warnings, important elements
- **Link Neon**: `#00d9ff` (Cyan) - Used for links, interactive elements

### Text Colors
- **Primary Text**: `#ffffff` (White)
- **Secondary Text**: `#e0e0e0` (Light gray)
- **Muted Text**: `#a0a0a0` (Medium gray)
- **Disabled Text**: `#666666` (Dark gray)

## Typography

### Font Families
- **Primary Font**: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Secondary Font**: 'Space Mono', 'Courier New', monospace (for code)

### Font Sizes
- **XS**: `12px` - Small labels, captions
- **SM**: `14px` - Body text, small components
- **Base**: `16px` - Default text size
- **LG**: `18px` - Large body text
- **XL**: `20px` - Small headings
- **2XL**: `24px` - Medium headings
- **3XL**: `30px` - Large headings
- **4XL**: `36px` - Extra large headings
- **5XL**: `48px` - Hero headings
- **6XL**: `60px` - Display headings

### Font Weights
- **Light**: `300` - Subtle text
- **Normal**: `400` - Regular text
- **Medium**: `500` - Emphasized text
- **Semibold**: `600` - Headings, important text
- **Bold**: `700` - Strong emphasis
- **Extrabold**: `800` - Display text

### Line Heights
- **Tight**: `1.2` - Headings
- **Normal**: `1.5` - Body text
- **Relaxed**: `1.75` - Extended reading content

## Spacing System

### 8px Scale
All spacing follows an 8px scale for consistency:
- **1**: `8px` - Small spacing
- **2**: `16px` - Default spacing
- **3**: `24px` - Medium spacing
- **4**: `32px` - Large spacing
- **5**: `40px` - Extra large spacing
- **6**: `48px` - Section spacing
- **8**: `64px` - Component spacing
- **10**: `80px` - Large section spacing
- **12**: `96px` - Page spacing
- **16**: `128px` - Extra page spacing
- **20**: `160px` - Hero spacing
- **24**: `192px` - Maximum spacing

## Border Radius

### Radius Values
- **Small**: `8px` - Buttons, small components
- **Medium**: `12px` - Cards, form elements
- **Large**: `16px` - Large cards, containers
- **XL**: `24px` - Special containers, hero elements

## Shadows

### Shadow Levels
- **Small**: `0 2px 4px rgba(0, 0, 0, 0.1)` - Subtle elevation
- **Medium**: `0 4px 8px rgba(0, 0, 0, 0.15)` - Default elevation
- **Large**: `0 8px 16px rgba(0, 0, 0, 0.2)` - Cards, containers
- **XL**: `0 16px 32px rgba(0, 0, 0, 0.25)` - Floating elements

### Neon Glow Effects
- **Primary Glow**: `0 0 20px #00ff88`
- **Secondary Glow**: `0 0 20px #a855f7`
- **Accent Glow**: `0 0 20px #ff3366`
- **Link Glow**: `0 0 20px #00d9ff`

## Transitions

### Timing Functions
- **Fast**: `150ms ease` - Micro-interactions
- **Normal**: `300ms ease` - Default transitions
- **Slow**: `500ms ease` - Complex animations

## Interactive States

### Hover Effects
- **Scale**: `scale(1.02)` - Subtle enlargement
- **Translate**: `translateY(-4px)` - Lift effect
- **Glow**: Add corresponding neon glow
- **Transition**: Apply normal transition timing

### Focus States
- **Outline**: `2px solid #00ff88`
- **Outline Offset**: `2px`
- **Background**: Slight glass effect enhancement

### Active States
- **Transform**: Slight scale down or brightness increase
- **Transition**: Fast timing for immediate feedback

## Components

### Buttons
- **Primary Button**: Green neon background, white text
- **Secondary Button**: Transparent with green border, green text
- **Hover**: Lift effect + neon glow
- **Focus**: Outline with neon color
- **Disabled**: Reduced opacity, no interactions

### Cards
- **Background**: Glass effect with blur
- **Border**: Subtle white border
- **Border Radius**: Large (16px)
- **Padding**: Medium spacing (24px)
- **Hover**: Lift + scale + neon glow

### Forms
- **Inputs**: Glass background, white border
- **Focus**: Neon border + glow
- **Labels**: Small font, neon color
- **Validation**: Error state with accent neon

### Navigation
- **Background**: Glass effect, fixed position
- **Links**: Secondary text with hover neon effect
- **Active**: Neon color with glow
- **Mobile**: Hamburger menu with smooth transitions

## Layout

### Container System
- **Max Width**: `1280px` (XL container)
- **Padding**: Responsive padding
- **Centering**: Auto margins

### Grid System
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns depending on content
- **Gap**: Medium spacing (24px)

### Section Spacing
- **Vertical**: Large padding (96px)
- **Horizontal**: Container padding
- **Hero**: Full viewport height with header offset

## Responsive Design

### Breakpoints
- **Small**: `640px` - Mobile devices
- **Medium**: `768px` - Tablets
- **Large**: `1024px` - Small desktops
- **XL**: `1280px` - Desktops
- **2XL**: `1536px` - Large desktops

### Mobile-First Approach
- Base styles target mobile devices
- Progressive enhancement for larger screens
- Touch-friendly targets (minimum 44px)

## Accessibility

### Focus Management
- Visible focus indicators
- Logical tab order
- Skip links for navigation
- Keyboard navigation support

### Screen Reader Support
- Semantic HTML5 elements
- ARIA labels where needed
- Live regions for dynamic content
- Alt text for images

### Color Contrast
- WCAG AA compliance minimum
- High contrast mode support
- Color-independent information

## Performance

### Optimization Techniques
- Lazy loading for images
- Debounced scroll events
- Efficient animations
- Minimal reflows/repaints

### Loading States
- Smooth transitions
- Loading indicators
- Progressive enhancement
- Graceful degradation

## Animation Guidelines

### Principles
- Purposeful motion
- Consistent timing
- Respect user preferences
- Performance conscious

### Types
- **Entrance**: Fade in with slight upward movement
- **Hover**: Scale and lift effects
- **Loading**: Subtle shimmer effects
- **Transitions**: Smooth state changes

## Usage Examples

### Glass Card
```html
<div class="card">
  <div class="card-content">
    <h3>Card Title</h3>
    <p>Card content with glass effect</p>
  </div>
</div>
```

### Neon Button
```html
<button class="btn btn-primary">
  Primary Action
</button>
```

### Form Input
```html
<div class="form-group">
  <label for="email" class="form-label">Email</label>
  <input type="email" id="email" class="form-input" required>
</div>
```

## Custom Properties

All design tokens are available as CSS custom properties for easy customization and theming. Refer to `css/variables.css` for the complete list of available properties.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- Progressive enhancement approach
- Fallbacks for unsupported features