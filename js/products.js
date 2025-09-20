// Products JavaScript file for GadgetPro
// Handles product pages, detailed views, and product interactions

$(document).ready(function() {
    'use strict';
    
    // Initialize product functionality
    initializeProductPage();
    initializeProductGallery();
    initializeProductOptions();
    initializeProductReviews();
});

// Initialize product page
function initializeProductPage() {
    // Check if we're on a product page
    if ($('.product-detail').length === 0) return;
    
    console.log('GadgetPro: Initializing product page...');
    
    // Load product data
    loadProductData();
    
    // Initialize quantity selector
    initializeQuantitySelector();
    
    // Initialize add to cart
    initializeAddToCart();
    
    // Initialize wishlist
    initializeWishlist();
    
    // Initialize product comparison
    initializeProductComparison();
}

// Load product data
function loadProductData() {
    const productId = getProductIdFromUrl();
    
    // Simulate API call
    const productData = getProductData(productId);
    
    if (productData) {
        displayProductData(productData);
    } else {
        showProductNotFound();
    }
}

// Get product ID from URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'pro';
}

// Get product data (simulated)
function getProductData(productId) {
    const products = {
        'basic': {
            id: 'basic',
            name: 'GadgetPro Basic',
            price: 199,
            originalPrice: 249,
            discount: 20,
            rating: 4.5,
            reviews: 1250,
            description: 'The perfect entry-level smart device with essential features for everyday use.',
            features: [
                'Standard Features',
                '1-Year Warranty',
                'Email Support',
                'Basic Setup Guide',
                'Standard Battery Life',
                'Basic Design'
            ],
            specifications: {
                'Dimensions': '150 x 75 x 8mm',
                'Weight': '180g',
                'Battery': '3000mAh',
                'Storage': '64GB',
                'RAM': '4GB',
                'Display': '6.1" HD',
                'Camera': '12MP',
                'Connectivity': 'WiFi, Bluetooth 5.0'
            },
            images: ['gadgetpro.png', 'feature1.png', 'feature2.png'],
            inStock: true,
            stockCount: 25
        },
        'pro': {
            id: 'pro',
            name: 'GadgetPro Pro',
            price: 299,
            originalPrice: 399,
            discount: 25,
            rating: 4.9,
            reviews: 2847,
            description: 'The flagship model with premium features and cutting-edge technology.',
            features: [
                'All Features',
                '2-Year Warranty',
                'Priority Support',
                'Premium Setup',
                'Free Shipping',
                'Extended Battery Life',
                'Premium Design',
                'Advanced Security'
            ],
            specifications: {
                'Dimensions': '155 x 78 x 8.5mm',
                'Weight': '195g',
                'Battery': '4000mAh',
                'Storage': '128GB',
                'RAM': '8GB',
                'Display': '6.5" Full HD',
                'Camera': '48MP',
                'Connectivity': 'WiFi 6, Bluetooth 5.2, 5G'
            },
            images: ['gadgetpro.png', 'feature3.png', 'feature4.jpg'],
            inStock: true,
            stockCount: 15
        },
        'enterprise': {
            id: 'enterprise',
            name: 'GadgetPro Enterprise',
            price: 499,
            originalPrice: 599,
            discount: 17,
            rating: 4.8,
            reviews: 892,
            description: 'Professional-grade device designed for business and enterprise use.',
            features: [
                'All Pro Features',
                '3-Year Warranty',
                '24/7 Support',
                'Custom Setup',
                'Training Session',
                'Maximum Battery Life',
                'Enterprise Design',
                'Advanced Security Suite',
                'Business Integration'
            ],
            specifications: {
                'Dimensions': '160 x 80 x 9mm',
                'Weight': '210g',
                'Battery': '5000mAh',
                'Storage': '256GB',
                'RAM': '12GB',
                'Display': '6.7" 4K',
                'Camera': '64MP',
                'Connectivity': 'WiFi 6E, Bluetooth 5.3, 5G'
            },
            images: ['gadgetpro.png', 'feature 5.avif', 'feature 6.jpg'],
            inStock: true,
            stockCount: 8
        }
    };
    
    return products[productId];
}

// Display product data
function displayProductData(product) {
    // Update page title
    document.title = `${product.name} - GadgetPro`;
    
    // Update product name
    $('.product-name').text(product.name);
    
    // Update pricing
    $('.product-price').text(GadgetPro.formatPrice(product.price));
    $('.product-original-price').text(GadgetPro.formatPrice(product.originalPrice));
    $('.product-discount').text(`${product.discount}% OFF`);
    
    // Update rating
    $('.product-rating').text(product.rating);
    $('.product-reviews-count').text(`(${product.reviews} reviews)`);
    
    // Update description
    $('.product-description').text(product.description);
    
    // Update features
    const featuresList = $('.product-features');
    featuresList.empty();
    product.features.forEach(feature => {
        featuresList.append(`<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`);
    });
    
    // Update specifications
    const specsList = $('.product-specifications');
    specsList.empty();
    Object.entries(product.specifications).forEach(([key, value]) => {
        specsList.append(`
            <div class="row mb-2">
                <div class="col-4"><strong>${key}:</strong></div>
                <div class="col-8">${value}</div>
            </div>
        `);
    });
    
    // Update stock status
    if (product.inStock) {
        $('.stock-status').html(`<i class="fas fa-check-circle text-success me-2"></i>In Stock (${product.stockCount} available)`);
        $('.add-to-cart').prop('disabled', false);
    } else {
        $('.stock-status').html('<i class="fas fa-times-circle text-danger me-2"></i>Out of Stock');
        $('.add-to-cart').prop('disabled', true);
    }
    
    // Update product images
    updateProductImages(product.images);
    
    // Update add to cart button
    $('.add-to-cart').data('product-id', product.id);
    $('.add-to-cart').data('product-name', product.name);
    $('.add-to-cart').data('product-price', product.price);
}

// Update product images
function updateProductImages(images) {
    const gallery = $('.product-gallery');
    gallery.empty();
    
    images.forEach((image, index) => {
        const img = $(`
            <div class="product-image ${index === 0 ? 'active' : ''}" data-image="${image}">
                <img src="${image}" alt="Product Image ${index + 1}" class="img-fluid">
            </div>
        `);
        gallery.append(img);
    });
    
    // Update thumbnails
    const thumbnails = $('.product-thumbnails');
    thumbnails.empty();
    
    images.forEach((image, index) => {
        const thumb = $(`
            <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                <img src="${image}" alt="Thumbnail ${index + 1}">
            </div>
        `);
        thumbnails.append(thumb);
    });
}

// Show product not found
function showProductNotFound() {
    $('.product-detail').html(`
        <div class="text-center py-5">
            <i class="fas fa-exclamation-triangle text-warning" style="font-size: 4rem;"></i>
            <h2 class="mt-3">Product Not Found</h2>
            <p class="text-muted">The product you're looking for doesn't exist.</p>
            <a href="index.html" class="btn btn-primary">Back to Home</a>
        </div>
    `);
}

// Initialize product gallery
function initializeProductGallery() {
    // Thumbnail click handler
    $(document).on('click', '.thumbnail', function() {
        const imageSrc = $(this).data('image');
        
        // Update active thumbnail
        $('.thumbnail').removeClass('active');
        $(this).addClass('active');
        
        // Update main image
        $('.product-image').removeClass('active');
        $(`.product-image[data-image="${imageSrc}"]`).addClass('active');
    });
    
    // Image zoom functionality
    $(document).on('click', '.product-image img', function() {
        const src = $(this).attr('src');
        showImageModal(src);
    });
}

// Show image modal
function showImageModal(imageSrc) {
    const modal = $(`
        <div class="modal fade" id="imageModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Product Image</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${imageSrc}" alt="Product Image" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    `);
    
    $('body').append(modal);
    const bsModal = new bootstrap.Modal(modal[0]);
    bsModal.show();
    
    modal.on('hidden.bs.modal', function() {
        modal.remove();
    });
}

// Initialize quantity selector
function initializeQuantitySelector() {
    $('.quantity-btn').on('click', function() {
        const action = $(this).data('action');
        const quantityInput = $('.quantity-input');
        let currentQuantity = parseInt(quantityInput.val());
        
        if (action === 'increase') {
            quantityInput.val(currentQuantity + 1);
        } else if (action === 'decrease' && currentQuantity > 1) {
            quantityInput.val(currentQuantity - 1);
        }
        
        updateTotalPrice();
    });
    
    $('.quantity-input').on('change', function() {
        const value = parseInt($(this).val());
        if (value < 1) {
            $(this).val(1);
        }
        updateTotalPrice();
    });
}

// Update total price
function updateTotalPrice() {
    const quantity = parseInt($('.quantity-input').val());
    const unitPrice = parseFloat($('.product-price').text().replace(/[^0-9.]/g, ''));
    const total = quantity * unitPrice;
    
    $('.total-price').text(GadgetPro.formatPrice(total));
}

// Initialize add to cart
function initializeAddToCart() {
    $('.add-to-cart').on('click', function(e) {
        e.preventDefault();
        
        const productId = $(this).data('product-id');
        const productName = $(this).data('product-name');
        const productPrice = $(this).data('product-price');
        const quantity = parseInt($('.quantity-input').val());
        
        // Add multiple items to cart
        for (let i = 0; i < quantity; i++) {
            GadgetPro.addToCart(productId, productName, productPrice);
        }
        
        // Show success animation
        $(this).addClass('btn-success').removeClass('btn-primary');
        $(this).html('<i class="fas fa-check me-2"></i>Added to Cart!');
        
        setTimeout(() => {
            $(this).addClass('btn-primary').removeClass('btn-success');
            $(this).html('<i class="fas fa-shopping-cart me-2"></i>Add to Cart');
        }, 2000);
    });
}

// Initialize wishlist
function initializeWishlist() {
    $('.wishlist-btn').on('click', function(e) {
        e.preventDefault();
        
        const productId = $(this).data('product-id');
        let wishlist = JSON.parse(localStorage.getItem('gadgetpro_wishlist')) || [];
        
        if (wishlist.includes(productId)) {
            wishlist = wishlist.filter(id => id !== productId);
            $(this).removeClass('btn-danger').addClass('btn-outline-danger');
            $(this).html('<i class="far fa-heart me-2"></i>Add to Wishlist');
            GadgetPro.showNotification('Removed from wishlist', 'info');
        } else {
            wishlist.push(productId);
            $(this).removeClass('btn-outline-danger').addClass('btn-danger');
            $(this).html('<i class="fas fa-heart me-2"></i>In Wishlist');
            GadgetPro.showNotification('Added to wishlist', 'success');
        }
        
        localStorage.setItem('gadgetpro_wishlist', JSON.stringify(wishlist));
    });
    
    // Check wishlist status on load
    const productId = getProductIdFromUrl();
    let wishlist = JSON.parse(localStorage.getItem('gadgetpro_wishlist')) || [];
    
    if (wishlist.includes(productId)) {
        $('.wishlist-btn').removeClass('btn-outline-danger').addClass('btn-danger');
        $('.wishlist-btn').html('<i class="fas fa-heart me-2"></i>In Wishlist');
    }
}

// Initialize product comparison
function initializeProductComparison() {
    $('.compare-btn').on('click', function(e) {
        e.preventDefault();
        
        const productId = $(this).data('product-id');
        let comparison = JSON.parse(localStorage.getItem('gadgetpro_comparison')) || [];
        
        if (comparison.includes(productId)) {
            GadgetPro.showNotification('Product already in comparison', 'info');
            return;
        }
        
        if (comparison.length >= 3) {
            GadgetPro.showNotification('You can compare up to 3 products', 'error');
            return;
        }
        
        comparison.push(productId);
        localStorage.setItem('gadgetpro_comparison', JSON.stringify(comparison));
        
        $(this).addClass('btn-success').removeClass('btn-outline-primary');
        $(this).html('<i class="fas fa-check me-2"></i>Added to Comparison');
        
        GadgetPro.showNotification('Added to comparison', 'success');
        
        setTimeout(() => {
            $(this).addClass('btn-outline-primary').removeClass('btn-success');
            $(this).html('<i class="fas fa-balance-scale me-2"></i>Compare');
        }, 2000);
    });
}

// Initialize product reviews
function initializeProductReviews() {
    // Load reviews
    loadProductReviews();
    
    // Review form submission
    $('#reviewForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const review = {
            name: formData.get('name'),
            rating: formData.get('rating'),
            comment: formData.get('comment'),
            date: new Date().toLocaleDateString()
        };
        
        // Save review to localStorage
        let reviews = JSON.parse(localStorage.getItem('gadgetpro_reviews')) || {};
        const productId = getProductIdFromUrl();
        
        if (!reviews[productId]) {
            reviews[productId] = [];
        }
        
        reviews[productId].push(review);
        localStorage.setItem('gadgetpro_reviews', JSON.stringify(reviews));
        
        GadgetPro.showNotification('Thank you for your review!', 'success');
        this.reset();
        loadProductReviews();
    });
}

// Load product reviews
function loadProductReviews() {
    const productId = getProductIdFromUrl();
    let reviews = JSON.parse(localStorage.getItem('gadgetpro_reviews')) || {};
    const productReviews = reviews[productId] || [];
    
    const reviewsContainer = $('.reviews-container');
    reviewsContainer.empty();
    
    if (productReviews.length === 0) {
        reviewsContainer.html('<p class="text-muted">No reviews yet. Be the first to review!</p>');
        return;
    }
    
    productReviews.forEach(review => {
        const reviewElement = $(`
            <div class="review-item mb-4 p-3 border rounded">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="mb-0">${review.name}</h6>
                    <small class="text-muted">${review.date}</small>
                </div>
                <div class="rating mb-2">
                    ${generateStars(review.rating)}
                </div>
                <p class="mb-0">${review.comment}</p>
            </div>
        `);
        reviewsContainer.append(reviewElement);
    });
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-warning"></i>';
        }
    }
    return stars;
}

// Export functions
window.ProductManager = {
    loadProductData,
    displayProductData,
    updateProductImages,
    showImageModal,
    generateStars
};
