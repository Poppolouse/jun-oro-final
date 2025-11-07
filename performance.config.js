/**
 * Performance Configuration for Neumorphism Portfolio
 * Defines performance budgets and optimization settings
 */

// Performance budgets based on industry standards
const PERFORMANCE_BUDGETS = {
  // Bundle size limits (gzipped)
  BUNDLE_SIZE: {
    TOTAL: 200 * 1024, // 200KB in bytes
    CSS: 50 * 1024,     // 50KB for CSS
    JS: 100 * 1024,      // 100KB for JavaScript
    IMAGES: 50 * 1024     // 50KB for images
  },
  
  // Core Web Vitals thresholds
  WEB_VITALS: {
    FCP: 1800,    // First Contentful Paint: <1.8s
    LCP: 2500,    // Largest Contentful Paint: <2.5s
    TTI: 3800,    // Time to Interactive: <3.8s
    TBT: 200,      // Total Blocking Time: <200ms
    CLS: 0.1       // Cumulative Layout Shift: <0.1
  },
  
  // Resource loading priorities
  RESOURCE_LOADING: {
    CRITICAL_CSS: 1000,    // 1s for critical CSS
    CRITICAL_JS: 1500,     // 1.5s for critical JS
    IMAGES: 3000,           // 3s for images
    FONTS: 2000            // 2s for fonts
  }
};

// Caching strategies
const CACHING_STRATEGIES = {
  // Service Worker cache settings
  SERVICE_WORKER: {
    STATIC_CACHE_NAME: 'static-cache-v1',
    DYNAMIC_CACHE_NAME: 'dynamic-cache-v1',
    STATIC_ASSETS: [
      '/',
      '/index.html',
      '/css/variables.css',
      '/css/design-system.css',
      '/css/layout.css',
      '/css/components.css',
      '/css/main.css',
      '/js/utils.js',
      '/js/components.js',
      '/js/main.js'
    ],
    CACHE_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    MAX_CACHE_SIZE: 50 * 1024 * 1024 // 50MB
  },
  
  // Browser cache headers
  BROWSER_CACHE: {
    STATIC_ASSETS: 'public, max-age=31536000, immutable', // 1 year
    HTML: 'public, max-age=3600, must-revalidate',     // 1 hour
    API_RESPONSES: 'public, max-age=300, must-revalidate'  // 5 minutes
  }
};

// Image optimization settings
const IMAGE_OPTIMIZATION = {
  // Lazy loading configuration
  LAZY_LOADING: {
    ROOT_MARGIN: '50px',
    THRESHOLD: 0.1,
    PLACEHOLDER_BLUR: 10,
    FADE_IN_DURATION: 300
  },
  
  // Responsive image breakpoints
  RESPONSIVE_BREAKPOINTS: {
    SMALL: 400,
    MEDIUM: 800,
    LARGE: 1200,
    XLARGE: 1600
  },
  
  // Image formats and quality
  FORMATS: {
    PREFERRED: 'webp',
    FALLBACK: 'jpg',
    QUALITY: {
      WEBP: 80,
      JPG: 85,
      PNG: 90
    }
  }
};

// Animation performance settings
const ANIMATION_PERFORMANCE = {
  // Frame rate targets
  TARGET_FPS: 60,
  FRAME_TIME: 1000 / 60, // ~16.67ms per frame
  
  // Hardware acceleration
  HARDWARE_ACCELERATION: {
    ENABLED: true,
    PREFERRED_PROPERTIES: ['transform', 'opacity', 'will-change'],
    CONTAIN_HINTS: ['layout', 'style', 'paint']
  },
  
  // Reduced motion support
  REDUCED_MOTION: {
    RESPECT_PREFERENCE: true,
    FALLBACK_DURATION: 0.01,
    DISABLE_ANIMATIONS: ['parallax', 'complex-transitions']
  }
};

// Mobile performance optimizations
const MOBILE_OPTIMIZATION = {
  // Touch interaction optimization
  TOUCH_OPTIMIZATION: {
    TAP_DELAY: 300,
    SCROLL_THRESHOLD: 10,
    PASSIVE_LISTENERS: true
  },
  
  // Resource loading priorities
  LOADING_PRIORITIES: {
    CRITICAL_ABOVE_FOLD: true,
    DEFER_NON_CRITICAL: true,
    MIN_BANDWIDTH_CONSIDERATION: 0.5 // 500kbps
  },
  
  // Layout optimization
  LAYOUT_OPTIMIZATION: {
    AVOID_REFLOWS: true,
    USE_CONTAIN: true,
    MINIMIZE_REPAINTS: true
  }
};

// Monitoring and analytics
const MONITORING = {
  // Core Web Vitals tracking
  WEB_VITALS_TRACKING: {
    ENABLED: true,
    SAMPLE_RATE: 1.0, // 100% sampling
    REPORTING_ENDPOINT: '/api/web-vitals',
    THRESHOLDS: PERFORMANCE_BUDGETS.WEB_VITALS
  },
  
  // Performance observer
  PERFORMANCE_OBSERVER: {
    BUFFERED: true,
    ENTRY_TYPES: [
      'measure',
      'navigation',
      'resource',
      'paint',
      'layout-shift',
      'largest-contentful-paint',
      'first-input',
      'long-task'
    ]
  }
};

// Export configuration
export {
  PERFORMANCE_BUDGETS,
  CACHING_STRATEGIES,
  IMAGE_OPTIMIZATION,
  ANIMATION_PERFORMANCE,
  MOBILE_OPTIMIZATION,
  MONITORING
};

// Utility functions for performance monitoring
export const PerformanceUtils = {
  // Check if performance budget is exceeded
  isBudgetExceeded(metric, value) {
    const budget = PERFORMANCE_BUDGETS.WEB_VITALS[metric.toUpperCase()];
    return budget ? value > budget : false;
  },
  
  // Get performance grade
  getPerformanceGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  },
  
  // Format performance metrics
  formatMetric(value, unit = 'ms', decimals = 2) {
    return `${value.toFixed(decimals)}${unit}`;
  },
  
  // Check if device is low-end
  isLowEndDevice() {
    return navigator.hardwareConcurrency <= 2 || 
           navigator.deviceMemory <= 2 ||
           /android|iphone|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent);
  }
};