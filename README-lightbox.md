# Minimal Lightbox Library

A lightweight, vanilla JavaScript lightbox library with **hotlinking support** for your inspiration gallery.

> **Created by Cursor AI Assistant**  
> Date: October 8, 2025  
> For: Arpit Batra's Inspiration Gallery

## Features

✅ **Hotlinking Support** - Direct URLs like `yoursite.com/#inspo-001`  
✅ **No Dependencies** - Pure vanilla JavaScript, no jQuery  
✅ **Gallery Navigation** - Arrow keys, touch/swipe support  
✅ **URL Management** - Updates browser URL when navigating  
✅ **Lightweight** - Under 5KB total  
✅ **Responsive** - Works on all devices  
✅ **Accessible** - ARIA labels and keyboard navigation  

## How to Use

### Basic Setup

1. **HTML Structure**: Add `class="lightbox-trigger"` to your image links
```html
<a href="./inspo/001.png" class="lightbox-trigger">
  <img src="./inspo/001.png" alt="Image description" />
</a>
```

2. **Include CSS**: Import the lightbox styles
```scss
@import 'lightbox';
```

3. **Include JavaScript**: Add the lightbox script
```html
<script src="./js/lightbox.js"></script>
```

### Hotlinking

The library automatically supports direct image URLs:

- `yoursite.com/#inspo-001` - Opens image 001
- `yoursite.com/#inspo-050` - Opens image 050
- `yoursite.com/#inspo-101` - Opens image 101

### Navigation

- **Keyboard**: Arrow keys (←/→), Escape to close
- **Mouse**: Click navigation buttons or background to close
- **Touch**: Swipe left/right to navigate, tap background to close

### Customization

You can customize the lightbox behavior:

```javascript
window.lightbox = new MinimalLightbox({
  selector: '.lightbox-trigger',
  hashPrefix: 'inspo-'
});
```

## File Structure

```
styles/
  ├── lightbox.scss    # Lightbox styles
  └── style.scss       # Main styles (imports lightbox)

js/
  └── lightbox.js      # Lightbox functionality

_site/
  ├── styles/
  │   ├── lightbox.css # Compiled CSS
  │   └── style.css
  └── js/
      └── lightbox.js  # Copied JS
```

## Build Process

The library integrates with your existing 11ty build:

```bash
npm run build    # Builds everything including lightbox
npm run serve    # Development server with file watching
```

## Browser Support

- Modern browsers (ES6+)
- Mobile Safari
- Chrome, Firefox, Edge
- Touch devices

## Size Comparison

| Library | Size | Dependencies |
|---------|------|--------------|
| Fancybox 3 | ~50KB | jQuery + CSS |
| **Minimal Lightbox** | **~5KB** | **None** |

## Migration from Fancybox

1. Remove Fancybox CSS and JS includes
2. Change `data-fancybox="inspo"` to `class="lightbox-trigger"`
3. Remove jQuery dependency
4. Build and test!

The new library maintains the same user experience while being much lighter and supporting hotlinking.
