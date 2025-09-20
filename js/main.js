// Main JavaScript file for GadgetPro Landing Page
// Handles general interactions, animations, and page behavior

$(document).ready(function() {
    'use strict';

    // Initialize all components
    initializeComponents();
    
    // Slideshow functionality
    initializeSlideshow();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Scroll animations
    initializeScrollAnimations();
    
    // Counter animations
    initializeCounterAnimations();
    
    // Interactive buttons
    initializeInteractiveButtons();
    
    // Cart functionality
    initializeCart();
    
    // Form validation
    initializeFormValidation();
});

// Initialize all components
function initializeComponents() {
    console.log('GadgetPro: Initializing components...');
    
    // Add loading animation
    $('body').addClass('loaded');
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Slideshow functionality
function initializeSlideshow() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length === 0) return;
    
    function showSlides() {
        slides.forEach((slide) => slide.classList.remove('active'));
        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;
        slides[slideIndex - 1].classList.add('active');
        setTimeout(showSlides, 3000);
    }
    
    // Start slideshow
    setTimeout(showSlides, 3000);
    
    // Add click navigation
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            slides.forEach(s => s.classList.remove('active'));
            slide.classList.add('active');
            slideIndex = index + 1;
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
}

// Scroll animations
function initializeScrollAnimations() {
    $(window).scroll(function() {
        $('.feature-card, .testimonial-card, .pricing-card').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    });
}

// Counter animations
function initializeCounterAnimations() {
    $('.stat-item h4').each(function() {
        var $this = $(this);
        var countTo = $this.text();
        
        if (countTo.includes('K+')) {
            var number = parseInt(countTo.replace('K+', ''));
            $({ countNum: 0 }).animate({
                countNum: number
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum) + 'K+');
                },
                complete: function() {
                    $this.text(countTo);
                }
            });
        }
    });
}

// Interactive buttons
function initializeInteractiveButtons() {
    // Add ripple effect to buttons
    $('.btn').on('click', function(e) {
        var $btn = $(this);
        var $ripple = $('<span class="ripple"></span>');
        var rect = this.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var x = e.clientX - rect.left - size / 2;
        var y = e.clientY - rect.top - size / 2;
        
        $ripple.css({
            width: size,
            height: size,
            left: x,
            top: y
        });
        
        $btn.append($ripple);
        
        setTimeout(() => {
            $ripple.remove();
        }, 600);
    });
    
    // Enhanced hover effects
    $('.feature-card, .testimonial-card, .pricing-card').hover(
        function() {
            $(this).addClass('hover-effect');
        },
        function() {
            $(this).removeClass('hover-effect');
        }
    );
}

// Cart functionality
function initializeCart() {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('gadgetpro_cart')) || [];
    updateCartDisplay(cart);
    
    // Add to cart functionality
    $('.add-to-cart').on('click', function(e) {
        e.preventDefault();
        
        const productId = $(this).data('product-id');
        const productName = $(this).data('product-name');
        const productPrice = $(this).data('product-price');
        
        addToCart(productId, productName, productPrice);
    });
}

// Add to cart function
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('gadgetpro_cart')) || [];
    
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('gadgetpro_cart', JSON.stringify(cart));
    updateCartDisplay(cart);
    
    // Show success message
    showNotification('Product added to cart!', 'success');
}

// Update cart display
function updateCartDisplay(cart) {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    $('.cart-count').text(cartCount);
    
    if (cartCount > 0) {
        $('.cart-count').addClass('visible');
    } else {
        $('.cart-count').removeClass('visible');
    }
}

// Form validation
function initializeFormValidation() {
    // Contact form validation
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const formData = new FormData(this);
        
        // Basic validation
        let isValid = true;
        form.find('[required]').each(function() {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        if (isValid) {
            // Simulate form submission
            showNotification('Thank you! We\'ll get back to you soon.', 'success');
            form[0].reset();
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = $(`
        <div class="notification notification-${type}">
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        </div>
    `);
    
    $('body').append(notification);
    
    setTimeout(() => {
        notification.addClass('show');
    }, 100);
    
    setTimeout(() => {
        notification.removeClass('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other files
window.GadgetPro = {
    addToCart,
    showNotification,
    formatPrice,
    debounce
};
