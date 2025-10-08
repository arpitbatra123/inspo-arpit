/**
 * Minimal Lightbox Library with Hotlinking Support
 * Supports direct URLs like: yoursite.com/#inspo-001
 * 
 * Created by Cursor AI Assistant
 * Date: October 8, 2025
 * For: Arpit Batra's Inspiration Gallery
 */

class MinimalLightbox {
  constructor(options = {}) {
    this.options = {
      selector: '.lightbox-trigger',
      hashPrefix: 'inspo-',
      ...options
    };
    
    this.gallery = [];
    this.currentIndex = 0;
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    this.createLightboxHTML();
    this.bindEvents();
    this.buildGallery();
    this.handleHashChange();
  }
  
  createLightboxHTML() {
    // Create lightbox HTML structure
    const lightboxHTML = `
      <div class="lightbox" id="lightbox">
        <div class="lightbox__container">
          <button class="lightbox__close" aria-label="Close lightbox"></button>
          <img class="lightbox__image" alt="" />
          <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image"></button>
          <button class="lightbox__nav lightbox__nav--next" aria-label="Next image"></button>
          <div class="lightbox__counter"></div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Cache elements
    this.lightbox = document.getElementById('lightbox');
    this.image = this.lightbox.querySelector('.lightbox__image');
    this.closeBtn = this.lightbox.querySelector('.lightbox__close');
    this.prevBtn = this.lightbox.querySelector('.lightbox__nav--prev');
    this.nextBtn = this.lightbox.querySelector('.lightbox__nav--next');
    this.counter = this.lightbox.querySelector('.lightbox__counter');
  }
  
  bindEvents() {
    // Close button
    this.closeBtn.addEventListener('click', () => this.close());
    
    // Navigation buttons
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    
    // Background click to close
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.close();
      }
    });
    
    // Click on gallery images
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest(this.options.selector);
      if (trigger) {
        e.preventDefault();
        const href = trigger.getAttribute('href');
        const index = this.gallery.findIndex(item => item.src === href);
        if (index !== -1) {
          this.open(index);
        }
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowLeft':
          this.prev();
          break;
        case 'ArrowRight':
          this.next();
          break;
      }
    });
    
    // Hash change (for hotlinking)
    window.addEventListener('hashchange', () => this.handleHashChange());
    
    // Touch/swipe support
    this.addTouchSupport();
  }
  
  addTouchSupport() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    this.lightbox.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });
    
    this.lightbox.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      
      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.next(); // Swipe left = next image
        } else {
          this.prev(); // Swipe right = previous image
        }
      }
    });
  }
  
  buildGallery() {
    // Find all lightbox triggers and build gallery array
    const triggers = document.querySelectorAll(this.options.selector);
    this.gallery = Array.from(triggers).map(trigger => {
      const href = trigger.getAttribute('href');
      const img = trigger.querySelector('img');
      return {
        src: href,
        alt: img ? img.getAttribute('alt') : '',
        element: trigger
      };
    });
  }
  
  handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    
    if (hash.startsWith(this.options.hashPrefix)) {
      const imageId = hash.replace(this.options.hashPrefix, '');
      const index = this.gallery.findIndex(item => {
        // Extract filename from src (e.g., "./inspo/001.png" -> "001")
        const filename = item.src.split('/').pop().split('.')[0];
        return filename === imageId;
      });
      
      if (index !== -1) {
        this.open(index);
      }
    } else if (this.isOpen) {
      this.close();
    }
  }
  
  open(index = 0) {
    if (index < 0 || index >= this.gallery.length) return;
    
    this.currentIndex = index;
    this.isOpen = true;
    
    const item = this.gallery[index];
    
    // Update image
    this.image.src = item.src;
    this.image.alt = item.alt;
    
    // Update counter
    this.counter.textContent = `${index + 1} / ${this.gallery.length}`;
    
    // Update navigation buttons
    this.prevBtn.disabled = index === 0;
    this.nextBtn.disabled = index === this.gallery.length - 1;
    
    // Show lightbox
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update URL without triggering hashchange
    const filename = item.src.split('/').pop().split('.')[0];
    const newHash = `${this.options.hashPrefix}${filename}`;
    if (window.location.hash !== `#${newHash}`) {
      history.pushState(null, null, `#${newHash}`);
    }
  }
  
  close() {
    this.isOpen = false;
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // Clear hash
    if (window.location.hash) {
      history.pushState(null, null, window.location.pathname);
    }
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.open(this.currentIndex - 1);
    }
  }
  
  next() {
    if (this.currentIndex < this.gallery.length - 1) {
      this.open(this.currentIndex + 1);
    }
  }
  
  // Public method to refresh gallery (useful for dynamic content)
  refresh() {
    this.buildGallery();
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.lightbox = new MinimalLightbox();
});

// Also try immediate initialization if DOM is already ready
if (document.readyState !== 'loading') {
  window.lightbox = new MinimalLightbox();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MinimalLightbox;
}
