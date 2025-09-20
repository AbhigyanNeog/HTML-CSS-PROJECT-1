// Payment and Checkout JavaScript file for GadgetPro
// Handles payment processing, checkout flow, and order management

$(document).ready(function() {
    'use strict';
    
    // Initialize payment functionality
    initializeCheckout();
    initializePaymentMethods();
    initializeOrderSummary();
    initializeFormValidation();
    initializePaymentProcessing();
});

// Initialize checkout
function initializeCheckout() {
    console.log('GadgetPro: Initializing checkout...');
    
    // Load cart items
    loadCartItems();
    
    // Initialize address forms
    initializeAddressForms();
    
    // Initialize shipping options
    initializeShippingOptions();
    
    // Initialize promo codes
    initializePromoCodes();
}

// Load cart items
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('gadgetpro_cart')) || [];
    const cartContainer = $('.cart-items');
    
    if (cart.length === 0) {
        cartContainer.html(`
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart text-muted" style="font-size: 3rem;"></i>
                <h4 class="mt-3">Your cart is empty</h4>
                <p class="text-muted">Add some products to get started!</p>
                <a href="index.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `);
        $('.checkout-btn').prop('disabled', true);
        return;
    }
    
    cartContainer.empty();
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = $(`
            <div class="cart-item border-bottom py-3" data-item-id="${item.id}">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="gadgetpro.png" alt="${item.name}" class="img-fluid rounded">
                    </div>
                    <div class="col-md-4">
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">SKU: ${item.id.toUpperCase()}</small>
                    </div>
                    <div class="col-md-2">
                        <div class="quantity-controls">
                            <button class="btn btn-sm btn-outline-secondary quantity-decrease" data-index="${index}">-</button>
                            <span class="mx-2 quantity-display">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary quantity-increase" data-index="${index}">+</button>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <span class="item-price">${GadgetPro.formatPrice(item.price)}</span>
                    </div>
                    <div class="col-md-2">
                        <span class="item-total fw-bold">${GadgetPro.formatPrice(itemTotal)}</span>
                        <button class="btn btn-sm btn-outline-danger ms-2 remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `);
        
        cartContainer.append(cartItem);
    });
    
    updateOrderSummary(total);
}

// Update order summary
function updateOrderSummary(subtotal) {
    const shipping = calculateShipping(subtotal);
    const tax = calculateTax(subtotal);
    const discount = getAppliedDiscount();
    const total = subtotal + shipping + tax - discount;
    
    $('.subtotal').text(GadgetPro.formatPrice(subtotal));
    $('.shipping').text(GadgetPro.formatPrice(shipping));
    $('.tax').text(GadgetPro.formatPrice(tax));
    $('.discount').text(GadgetPro.formatPrice(discount));
    $('.total').text(GadgetPro.formatPrice(total));
    
    // Store total for payment processing
    localStorage.setItem('gadgetpro_order_total', total);
}

// Calculate shipping
function calculateShipping(subtotal) {
    if (subtotal >= 200) {
        return 0; // Free shipping over $200
    }
    
    const shippingMethod = $('input[name="shipping"]:checked').val();
    const shippingRates = {
        'standard': 9.99,
        'express': 19.99,
        'overnight': 29.99
    };
    
    return shippingRates[shippingMethod] || 9.99;
}

// Calculate tax
function calculateTax(subtotal) {
    const taxRate = 0.08; // 8% tax rate
    return subtotal * taxRate;
}

// Get applied discount
function getAppliedDiscount() {
    const promoCode = localStorage.getItem('gadgetpro_promo_code');
    if (!promoCode) return 0;
    
    const cart = JSON.parse(localStorage.getItem('gadgetpro_cart')) || [];
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    const promoDiscounts = {
        'SAVE10': subtotal * 0.1,
        'SAVE20': subtotal * 0.2,
        'WELCOME': 25
    };
    
    return promoDiscounts[promoCode] || 0;
}

// Initialize address forms
function initializeAddressForms() {
    // Billing address same as shipping
    $('#sameAsShipping').on('change', function() {
        if ($(this).is(':checked')) {
            copyShippingToBilling();
            $('.billing-address').hide();
        } else {
            $('.billing-address').show();
        }
    });
    
    // Address validation
    $('.address-form input').on('blur', function() {
        validateAddressField($(this));
    });
}

// Copy shipping to billing
function copyShippingToBilling() {
    const shippingFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zip', 'country'];
    
    shippingFields.forEach(field => {
        const shippingValue = $(`#shipping${field.charAt(0).toUpperCase() + field.slice(1)}`).val();
        $(`#billing${field.charAt(0).toUpperCase() + field.slice(1)}`).val(shippingValue);
    });
}

// Validate address field
function validateAddressField($field) {
    const value = $field.val().trim();
    const fieldName = $field.attr('name');
    
    $field.removeClass('is-valid is-invalid');
    
    if (!value) {
        $field.addClass('is-invalid');
        return false;
    }
    
    // Specific validations
    if (fieldName === 'email' && !isValidEmail(value)) {
        $field.addClass('is-invalid');
        return false;
    }
    
    if (fieldName === 'phone' && !isValidPhone(value)) {
        $field.addClass('is-invalid');
        return false;
    }
    
    if (fieldName === 'zip' && !isValidZip(value)) {
        $field.addClass('is-invalid');
        return false;
    }
    
    $field.addClass('is-valid');
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// ZIP validation
function isValidZip(zip) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
}

// Initialize shipping options
function initializeShippingOptions() {
    $('input[name="shipping"]').on('change', function() {
        const cart = JSON.parse(localStorage.getItem('gadgetpro_cart')) || [];
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        updateOrderSummary(subtotal);
    });
}

// Initialize promo codes
function initializePromoCodes() {
    $('#promoForm').on('submit', function(e) {
        e.preventDefault();
        
        const promoCode = $('#promoCode').val().toUpperCase();
        const validCodes = ['SAVE10', 'SAVE20', 'WELCOME'];
        
        if (validCodes.includes(promoCode)) {
            localStorage.setItem('gadgetpro_promo_code', promoCode);
            
            const cart = JSON.parse(localStorage.getItem('gadgetpro_cart')) || [];
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            updateOrderSummary(subtotal);
            
            GadgetPro.showNotification('Promo code applied successfully!', 'success');
            $('#promoCode').val('');
        } else {
            GadgetPro.showNotification('Invalid promo code', 'error');
        }
    });
}

// Initialize payment methods
function initializePaymentMethods() {
    $('input[name="paymentMethod"]').on('change', function() {
        const method = $(this).val();
        
        // Hide all payment forms
        $('.payment-form').hide();
        
        // Show selected payment form
        $(`.payment-form[data-method="${method}"]`).show();
        
        // Update payment button text
        const buttonTexts = {
            'credit': 'Pay with Credit Card',
            'paypal': 'Pay with PayPal',
            'apple': 'Pay with Apple Pay',
            'google': 'Pay with Google Pay'
        };
        
        $('.payment-btn').text(buttonTexts[method]);
    });
}

// Initialize order summary
function initializeOrderSummary() {
    // Quantity controls
    $(document).on('click', '.quantity-increase', function() {
        const index = $(this).data('index');
        updateCartQuantity(index, 1);
    });
    
    $(document).on('click', '.quantity-decrease', function() {
        const index = $(this).data('index');
        updateCartQuantity(index, -1);
    });
    
    // Remove item
    $(document).on('click', '.remove-item', function() {
        const index = $(this).data('index');
        removeCartItem(index);
    });
}

// Update cart quantity
function updateCartQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('gadgetpro_cart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('gadgetpro_cart', JSON.stringify(cart));
        loadCartItems();
        GadgetPro.updateCartDisplay(cart);
    }
}

// Remove cart item
function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem('gadgetpro_cart')) || [];
    
    if (cart[index]) {
        cart.splice(index, 1);
        localStorage.setItem('gadgetpro_cart', JSON.stringify(cart));
        loadCartItems();
        GadgetPro.updateCartDisplay(cart);
        
        GadgetPro.showNotification('Item removed from cart', 'info');
    }
}

// Initialize form validation
function initializeFormValidation() {
    $('#checkoutForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateCheckoutForm()) {
            processPayment();
        }
    });
}

// Validate checkout form
function validateCheckoutForm() {
    let isValid = true;
    
    // Validate shipping address
    const shippingFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zip', 'country', 'email', 'phone'];
    
    shippingFields.forEach(field => {
        const $field = $(`#shipping${field.charAt(0).toUpperCase() + field.slice(1)}`);
        if (!validateAddressField($field)) {
            isValid = false;
        }
    });
    
    // Validate billing address if different
    if (!$('#sameAsShipping').is(':checked')) {
        const billingFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zip', 'country'];
        
        billingFields.forEach(field => {
            const $field = $(`#billing${field.charAt(0).toUpperCase() + field.slice(1)}`);
            if (!validateAddressField($field)) {
                isValid = false;
            }
        });
    }
    
    // Validate payment method
    if (!$('input[name="paymentMethod"]:checked').length) {
        GadgetPro.showNotification('Please select a payment method', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Initialize payment processing
function initializePaymentProcessing() {
    $('.payment-btn').on('click', function(e) {
        e.preventDefault();
        
        if (validateCheckoutForm()) {
            processPayment();
        }
    });
}

// Process payment
function processPayment() {
    const paymentMethod = $('input[name="paymentMethod"]:checked').val();
    const orderTotal = localStorage.getItem('gadgetpro_order_total');
    
    // Show loading state
    $('.payment-btn').prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Processing...');
    
    // Simulate payment processing
    setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        
        if (success) {
            completeOrder();
        } else {
            showPaymentError();
        }
    }, 3000);
}

// Complete order
function completeOrder() {
    // Generate order number
    const orderNumber = 'GP' + Date.now().toString().slice(-8);
    
    // Create order record
    const order = {
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        items: JSON.parse(localStorage.getItem('gadgetpro_cart')) || [],
        total: localStorage.getItem('gadgetpro_order_total'),
        status: 'confirmed',
        shipping: $('input[name="shipping"]:checked').val(),
        paymentMethod: $('input[name="paymentMethod"]:checked').val()
    };
    
    // Save order
    let orders = JSON.parse(localStorage.getItem('gadgetpro_orders')) || [];
    orders.push(order);
    localStorage.setItem('gadgetpro_orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('gadgetpro_cart');
    localStorage.removeItem('gadgetpro_promo_code');
    localStorage.removeItem('gadgetpro_order_total');
    
    // Redirect to success page
    window.location.href = `order-success.html?order=${orderNumber}`;
}

// Show payment error
function showPaymentError() {
    $('.payment-btn').prop('disabled', false).html('<i class="fas fa-credit-card me-2"></i>Try Again');
    GadgetPro.showNotification('Payment failed. Please try again.', 'error');
}

// Export functions
window.PaymentManager = {
    loadCartItems,
    updateOrderSummary,
    calculateShipping,
    calculateTax,
    validateCheckoutForm,
    processPayment,
    completeOrder
};
