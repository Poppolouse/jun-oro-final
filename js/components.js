/**
 * Component Logic and Interactions
 * Reusable component behaviors and UI interactions
 */

import { debounce, throttle, isInViewport, smoothScroll, generateId, validateField, getFormData, copyToClipboard } from './utils.js';

/**
 * Navigation Component
 */
export class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.isMenuOpen = false;
    
    this.init();
  }
  
  init() {
    if (!this.nav) return;
    
    this.bindEvents();
    this.handleScroll();
    this.setupActiveNavigation();
  }
  
  bindEvents() {
    // Mobile menu toggle with passive event listeners
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMenu(), { passive: true });
    }
    
    // Close menu on link click with passive event listeners
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu(), { passive: true });
    });
    
    // Handle scroll for header styling with optimized throttling
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 16), { passive: true, capture: false });
    
    // Handle resize with optimized debouncing
    window.addEventListener('resize', debounce(() => this.handleResize(), 250), { passive: true });
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.navMenu) {
      this.navMenu.classList.toggle('active', this.isMenuOpen);
    }
    
    if (this.navToggle) {
      this.navToggle.classList.toggle('active', this.isMenuOpen);
      this.navToggle.setAttribute('aria-expanded', this.isMenuOpen);
    }
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }
  
  closeMenu() {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }
  
  handleScroll() {
    if (!this.nav) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    this.nav.classList.toggle('scrolled', scrollTop > 50);
  }
  
  handleResize() {
    // Close menu on resize to desktop
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }
  
  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          // Use requestAnimationFrame for better performance
          requestAnimationFrame(() => {
            this.setActiveNavLink(id);
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
      rootMargin: '-100px 0px -70% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
  }
  
  setActiveNavLink(activeId) {
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === `#${activeId}`;
      
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }
}

/**
 * Form Component
 */
export class Form {
  constructor(formElement) {
    this.form = formElement;
    this.fields = this.form.querySelectorAll('input, textarea, select');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.isSubmitting = false;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupValidation();
  }
  
  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation with passive event listeners
    this.fields.forEach(field => {
      field.addEventListener('blur', () => this.validateField(field), { passive: true });
      field.addEventListener('input', () => this.clearFieldError(field), { passive: true });
    });
  }
  
  setupValidation() {
    // Add custom validation methods if needed
    this.fields.forEach(field => {
      field.addEventListener('invalid', (e) => {
        e.preventDefault();
        this.showFieldError(field, field.validationMessage);
      });
    });
  }
  
  validateField(field) {
    const validation = validateField(field);
    
    if (!validation.isValid) {
      this.showFieldError(field, validation.errors[0]);
    } else {
      this.clearFieldError(field);
    }
    
    return validation.isValid;
  }
  
  showFieldError(field, message) {
    this.clearFieldError(field);
    
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    
    field.parentNode.appendChild(errorElement);
  }
  
  clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isSubmitting) return;
    
    // Validate all fields
    let isValid = true;
    this.fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      this.showFormError('Please fix the errors above');
      return;
    }
    
    this.setSubmitting(true);
    
    try {
      const formData = getFormData(this.form);
      
      // Emit custom event for form submission
      const event = new CustomEvent('formSubmit', {
        detail: { formData, form: this.form }
      });
      this.form.dispatchEvent(event);
      
      // Reset form on success
      this.form.reset();
      this.showFormSuccess('Form submitted successfully!');
      
    } catch (error) {
      this.showFormError('An error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      this.setSubmitting(false);
    }
  }
  
  setSubmitting(isSubmitting) {
    this.isSubmitting = isSubmitting;
    
    if (this.submitButton) {
      this.submitButton.disabled = isSubmitting;
      this.submitButton.textContent = isSubmitting ? 'Submitting...' : this.submitButton.getAttribute('data-original-text') || 'Submit';
      
      if (!isSubmitting && !this.submitButton.getAttribute('data-original-text')) {
        this.submitButton.setAttribute('data-original-text', this.submitButton.textContent);
      }
    }
  }
  
  showFormError(message) {
    this.clearFormMessage();
    this.showMessage(message, 'error');
  }
  
  showFormSuccess(message) {
    this.clearFormMessage();
    this.showMessage(message, 'success');
  }
  
  showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    messageElement.setAttribute('role', 'alert');
    messageElement.setAttribute('aria-live', 'polite');
    
    this.form.insertBefore(messageElement, this.form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }
  
  clearFormMessage() {
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
  }
}

/**
 * Modal Component
 */
export class Modal {
  constructor(options = {}) {
    this.id = options.id || generateId('modal');
    this.title = options.title || '';
    this.content = options.content || '';
    this.showCloseButton = options.showCloseButton !== false;
    this.closeOnBackdrop = options.closeOnBackdrop !== false;
    this.onOpen = options.onOpen || (() => {});
    this.onClose = options.onClose || (() => {});
    
    this.isOpen = false;
    this.modal = null;
    
    this.create();
    this.bindEvents();
  }
  
  create() {
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.id = this.id;
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-labelledby', `${this.id}-title`);
    
    this.modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content" role="document">
        <div class="modal-header">
          <h2 class="modal-title" id="${this.id}-title">${this.title}</h2>
          ${this.showCloseButton ? '<button class="modal-close" aria-label="Close modal">&times;</button>' : ''}
        </div>
        <div class="modal-body">
          ${this.content}
        </div>
      </div>
    `;
    
    document.body.appendChild(this.modal);
  }
  
  bindEvents() {
    // Close button
    const closeButton = this.modal.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }
    
    // Backdrop click
    if (this.closeOnBackdrop) {
      const backdrop = this.modal.querySelector('.modal-backdrop');
      backdrop.addEventListener('click', () => this.close());
    }
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }
  
  open() {
    if (this.isOpen) return;
    
    this.isOpen = true;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    
    this.onOpen();
  }
  
  close() {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    this.onClose();
  }
  
  destroy() {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
  }
}

/**
 * Scroll Reveal Animation
 */
export class ScrollReveal {
  constructor(options = {}) {
    this.elements = document.querySelectorAll('[data-reveal]');
    this.threshold = options.threshold || 0.1;
    this.delay = options.delay || 0;
    this.duration = options.duration || 800;
    
    this.init();
  }
  
  init() {
    if (this.elements.length === 0) return;
    
    this.setupElements();
    this.createObserver();
  }
  
  setupElements() {
    this.elements.forEach(element => {
      const delay = element.dataset.revealDelay || this.delay;
      const duration = element.dataset.revealDuration || this.duration;
      
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      element.style.transitionDelay = `${delay}ms`;
    });
  }
  
  createObserver() {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smooth animations
          requestAnimationFrame(() => {
            this.revealElement(entry.target);
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold: this.threshold
    });
    
    this.elements.forEach(element => observer.observe(element));
  }
  
  revealElement(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }
}

/**
 * Tab Component
 */
export class Tabs {
  constructor(container) {
    this.container = container;
    this.tabButtons = container.querySelectorAll('.tab-button');
    this.tabPanels = container.querySelectorAll('.tab-panel');
    this.activeIndex = 0;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.showTab(this.activeIndex);
  }
  
  bindEvents() {
    this.tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => this.showTab(index));
      button.addEventListener('keydown', (e) => this.handleKeydown(e, index));
    });
  }
  
  showTab(index) {
    if (index < 0 || index >= this.tabButtons.length) return;
    
    // Update buttons
    this.tabButtons.forEach((button, i) => {
      const isActive = i === index;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', isActive);
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    
    // Update panels
    this.tabPanels.forEach((panel, i) => {
      const isActive = i === index;
      panel.classList.toggle('active', isActive);
      panel.setAttribute('aria-hidden', !isActive);
    });
    
    this.activeIndex = index;
  }
  
  handleKeydown(e, index) {
    let newIndex = index;
    
    switch (e.key) {
      case 'ArrowLeft':
        newIndex = index > 0 ? index - 1 : this.tabButtons.length - 1;
        break;
      case 'ArrowRight':
        newIndex = index < this.tabButtons.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = this.tabButtons.length - 1;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    this.showTab(newIndex);
    this.tabButtons[newIndex].focus();
  }
}

/**
 * Accordion Component
 */
export class Accordion {
  constructor(container, options = {}) {
    this.container = container;
    this.items = container.querySelectorAll('.accordion-item');
    this.allowMultiple = options.allowMultiple || false;
    this.defaultOpen = options.defaultOpen || 0;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.openDefaultItems();
  }
  
  bindEvents() {
    this.items.forEach((item, index) => {
      const header = item.querySelector('.accordion-header');
      const button = item.querySelector('.accordion-button');
      
      if (button) {
        button.addEventListener('click', () => this.toggleItem(index));
        button.addEventListener('keydown', (e) => this.handleKeydown(e, index));
      }
    });
  }
  
  openDefaultItems() {
    if (this.defaultOpen !== null) {
      if (Array.isArray(this.defaultOpen)) {
        this.defaultOpen.forEach(index => this.openItem(index));
      } else {
        this.openItem(this.defaultOpen);
      }
    }
  }
  
  toggleItem(index) {
    const item = this.items[index];
    if (!item) return;
    
    const isOpen = item.classList.contains('active');
    
    if (isOpen) {
      this.closeItem(index);
    } else {
      this.openItem(index);
    }
  }
  
  openItem(index) {
    const item = this.items[index];
    if (!item) return;
    
    if (!this.allowMultiple) {
      this.closeAllItems();
    }
    
    item.classList.add('active');
    
    const button = item.querySelector('.accordion-button');
    if (button) {
      button.setAttribute('aria-expanded', 'true');
    }
  }
  
  closeItem(index) {
    const item = this.items[index];
    if (!item) return;
    
    item.classList.remove('active');
    
    const button = item.querySelector('.accordion-button');
    if (button) {
      button.setAttribute('aria-expanded', 'false');
    }
  }
  
  closeAllItems() {
    this.items.forEach((item, index) => this.closeItem(index));
  }
  
  handleKeydown(e, index) {
    let newIndex = index;
    
    switch (e.key) {
      case 'ArrowDown':
        newIndex = index < this.items.length - 1 ? index + 1 : 0;
        break;
      case 'ArrowUp':
        newIndex = index > 0 ? index - 1 : this.items.length - 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = this.items.length - 1;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    const newButton = this.items[newIndex].querySelector('.accordion-button');
    if (newButton) {
      newButton.focus();
    }
  }
}

/**
 * Copy to Clipboard Component
 */
export class CopyButton {
  constructor(button) {
    this.button = button;
    this.text = button.dataset.copyText || button.textContent;
    this.successText = button.dataset.copySuccess || 'Copied!';
    this.originalText = button.textContent;
    
    this.init();
  }
  
  init() {
    this.button.addEventListener('click', () => this.copy());
  }
  
  async copy() {
    try {
      const success = await copyToClipboard(this.text);
      
      if (success) {
        this.showSuccess();
      } else {
        this.showError();
      }
    } catch (error) {
      this.showError();
      console.error('Copy failed:', error);
    }
  }
  
  showSuccess() {
    this.button.textContent = this.successText;
    this.button.classList.add('success');
    
    setTimeout(() => {
      this.button.textContent = this.originalText;
      this.button.classList.remove('success');
    }, 2000);
  }
  
  showError() {
    this.button.textContent = 'Failed!';
    this.button.classList.add('error');
    
    setTimeout(() => {
      this.button.textContent = this.originalText;
      this.button.classList.remove('error');
    }, 2000);
  }
}

/**
 * Initialize all components
 */
export const initComponents = () => {
  // Initialize navigation
  new Navigation();
  
  // Initialize forms
  document.querySelectorAll('form').forEach(form => {
    new Form(form);
  });
  
  // Initialize scroll reveal
  new ScrollReveal();
  
  // Initialize tabs
  document.querySelectorAll('.tabs').forEach(container => {
    new Tabs(container);
  });
  
  // Initialize accordions
  document.querySelectorAll('.accordion').forEach(container => {
    new Accordion(container);
  });
  
  // Initialize copy buttons
  document.querySelectorAll('[data-copy-text]').forEach(button => {
    new CopyButton(button);
  });
  
  // Initialize smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(target, 64); // Account for fixed header
      });
    }
  });
};