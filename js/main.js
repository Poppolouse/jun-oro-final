/**
 * Main Application Entry Point
 * Initializes all components and sets up the application
 */

import { initComponents } from './components.js';
import { getDeviceInfo, storage } from './utils.js';

/**
 * Application Class
 */
class App {
  constructor() {
    this.isLoaded = false;
    this.deviceInfo = getDeviceInfo();
    
    this.init();
  }
  
  async init() {
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }
      
      // Setup application
      this.setupDeviceClasses();
      this.setupTheme();
      this.setupPerformanceOptimizations();
      this.setupAccessibility();
      this.setupErrorHandling();
      
      // Initialize components
      initComponents();
      
      // Setup custom event listeners
      this.setupEventListeners();
      
      // Mark as loaded
      this.markAsLoaded();
      
      console.log('🚀 Neumorphism Portfolio initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize application:', error);
      this.handleCriticalError(error);
    }
  }
  
  setupDeviceClasses() {
    // Add device classes to body for responsive styling
    const { isMobile, isTablet, isDesktop } = this.deviceInfo;
    
    document.body.classList.toggle('mobile', isMobile);
    document.body.classList.toggle('tablet', isTablet);
    document.body.classList.toggle('desktop', isDesktop);
    
    // Add browser classes
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('chrome')) {
      document.body.classList.add('chrome');
    } else if (userAgent.includes('firefox')) {
      document.body.classList.add('firefox');
    } else if (userAgent.includes('safari')) {
      document.body.classList.add('safari');
    } else if (userAgent.includes('edge')) {
      document.body.classList.add('edge');
    }
  }
  
  setupTheme() {
    // Check for saved theme preference
    const savedTheme = storage.get('theme', 'dark');
    this.setTheme(savedTheme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!storage.get('theme')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set('theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = theme === 'dark' ? '#0a0e27' : '#ffffff';
    }
  }
  
  setupPerformanceOptimizations() {
    // Lazy load images with performance optimization
    this.setupLazyLoading();
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Setup intersection observer for animations with performance optimization
    this.setupIntersectionObserver();
    
    // Optimize scroll performance
    this.setupScrollOptimization();
    
    // Setup performance monitoring
    this.setupPerformanceMonitoring();
  }
  
  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  }
  
  preloadCriticalResources() {
    // Preload fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
      'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap'
    ];
    
    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = function() { this.rel = 'stylesheet'; };
      document.head.appendChild(link);
    });
  }
  
  setupIntersectionObserver() {
    // Setup observer for scroll animations with performance optimization
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animation = element.dataset.animate;
            
            // Use requestAnimationFrame for smooth animations
            requestAnimationFrame(() => {
              element.classList.add('animate', `animate--${animation}`);
            });
            
            observer.unobserve(element);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      animatedElements.forEach(element => {
        observer.observe(element);
      });
    }
  }
  
  setupScrollOptimization() {
    let ticking = false;
    
    const updateScrollPosition = () => {
      // Update scroll-based styles
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      document.body.classList.toggle('scrolled', scrollTop > 50);
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', onScroll, { passive: true, capture: false });
  }
  
  setupAccessibility() {
    // Setup skip links
    this.setupSkipLinks();
    
    // Setup focus management
    this.setupFocusManagement();
    
    // Setup keyboard navigation
    this.setupKeyboardNavigation();
    
    // Setup screen reader announcements
    this.setupScreenReaderAnnouncements();
  }
  
  setupSkipLinks() {
    const skipLinks = document.querySelectorAll('.skip-link');
    
    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
          
          // Remove tabindex after focus
          setTimeout(() => {
            target.removeAttribute('tabindex');
          }, 1000);
        }
      });
    });
  }
  
  setupFocusManagement() {
    // Track focus for better keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }
  
  setupKeyboardNavigation() {
    // Enhanced keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    interactiveElements.forEach(element => {
      element.addEventListener('keydown', (e) => {
        // Handle Enter key for non-form elements
        if (e.key === 'Enter' && !['INPUT', 'TEXTAREA'].includes(element.tagName)) {
          element.click();
        }
        
        // Handle Space key for buttons
        if (e.key === ' ' && element.tagName === 'BUTTON') {
          e.preventDefault();
          element.click();
        }
      });
    });
  }
  
  setupScreenReaderAnnouncements() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only live-region';
    document.body.appendChild(liveRegion);
    
    // Make announcement function globally available
    window.announceToScreenReader = (message) => {
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    };
  }
  
  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      this.handleError(e.error);
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      this.handleError(e.reason);
    });
  }
  
  handleError(error) {
    // Log error for debugging
    console.error('Application error:', error);
    
    // Show user-friendly error message
    this.showErrorMessage('Something went wrong. Please try refreshing the page.');
    
    // Send error to analytics (if available)
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false
      });
    }
  }
  
  handleCriticalError(error) {
    // Show critical error message
    document.body.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: #0a0e27;
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <div>
          <h1 style="margin-bottom: 20px;">Application Error</h1>
          <p style="margin-bottom: 20px;">We're sorry, but something went wrong while loading the application.</p>
          <button onclick="window.location.reload()" style="
            background: #00ff88;
            color: #0a0e27;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
          ">Reload Page</button>
        </div>
      </div>
    `;
  }
  
  showErrorMessage(message) {
    // Create error notification
    const errorElement = document.createElement('div');
    errorElement.className = 'alert alert-error';
    errorElement.setAttribute('role', 'alert');
    errorElement.innerHTML = `
      ${message}
      <button class="alert-close" aria-label="Close error">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(errorElement);
    
    // Position the error
    errorElement.style.position = 'fixed';
    errorElement.style.top = '20px';
    errorElement.style.right = '20px';
    errorElement.style.zIndex = '9999';
    errorElement.style.maxWidth = '400px';
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.parentNode.removeChild(errorElement);
      }
    }, 5000);
    
    // Handle close button
    const closeButton = errorElement.querySelector('.alert-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        if (errorElement.parentNode) {
          errorElement.parentNode.removeChild(errorElement);
        }
      });
    }
  }
  
  setupEventListeners() {
    // Handle form submissions globally
    document.addEventListener('formSubmit', (e) => {
      console.log('Form submitted:', e.detail.formData);
      
      // Here you would typically send the data to a server
      // For now, we'll just log it
    });
    
    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('Application hidden');
      } else {
        console.log('Application visible');
      }
    });
    
    // Handle online/offline status
    window.addEventListener('online', () => {
      this.showErrorMessage('Connection restored');
    });
    
    window.addEventListener('offline', () => {
      this.showErrorMessage('Connection lost. Some features may not work.');
    });
  }
  
  markAsLoaded() {
    this.isLoaded = true;
    document.body.classList.add('loaded');
    
    // Remove loading indicator if present
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
    
    // Announce to screen readers
    if (window.announceToScreenReader) {
      window.announceToScreenReader('Portfolio website loaded');
    }
  }
  
  // Public API methods
  showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.setAttribute('role', 'alert');
    notification.innerHTML = `
      ${message}
      <button class="alert-close" aria-label="Close notification">&times;</button>
    `;
    
    // Position the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '400px';
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, duration);
    
    // Handle close button
    const closeButton = notification.querySelector('.alert-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      });
    }
  }
  
  // Performance monitoring
  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }
      
      // Monitor First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }
    }
  }
  
  // Analytics and tracking
  trackPageView(page) {
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: page
      });
    }
  }
  
  trackEvent(action, category = 'interaction', label = null) {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }
}

// Initialize the application
const app = new App();

// Make app instance globally available for debugging
window.app = app;

// Export for module usage
export default app;