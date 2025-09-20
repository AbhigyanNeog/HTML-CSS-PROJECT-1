// Movie Detail Page JavaScript

// Sample movie data (same as main page)
const movies = [
    {
        id: 1,
        title: "The Midnight Signal",
        genre: "Thriller",
        year: 2024,
        duration: "2h 5m",
        rating: 8.4,
        poster: "freedom.jpg",
        description: "A retired radio host receives a midnight transmission that promises to reveal the truth behind a decades-old disappearance. A slow-burning psychological thriller that explores memory, guilt, and the dangerous power of stories.",
        cast: ["A. K. Collins", "Maya Rios", "Jon Park", "Rina Gupta"],
        platforms: ["Netflix", "Prime Video", "MUBI"]
    },
    {
        id: 2,
        title: "F1",
        genre: "Sci-Fi",
        year: 2010,
        duration: "2h 28m",
        rating: 8.8,
        poster: "image1.png",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Elliot Page"],
        platforms: ["Netflix", "HBO Max"]
    },
    {
        id: 3,
        title: "WAR",
        genre: "Action",
        year: 2008,
        duration: "2h 32m",
        rating: 9.0,
        poster: "image2.png",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
        platforms: ["HBO Max", "Prime Video"]
    },
    {
        id: 4,
        title: "Saiyaara",
        genre: "Drama",
        year: 1994,
        duration: "2h 34m",
        rating: 8.9,
        poster: "image3.png",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Bruce Willis"],
        platforms: ["Netflix", "Hulu"]
    },
    {
        id: 5,
        title: "Squid Game",
        genre: "Drama",
        year: 1994,
        duration: "2h 22m",
        rating: 9.3,
        poster: "image4.jpg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
        platforms: ["Netflix", "HBO Max"]
    },
    {
        id: 6,
        title: "The Matrix",
        genre: "Sci-Fi",
        year: 1999,
        duration: "2h 16m",
        rating: 8.7,
        poster: "maya.jpg",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
        platforms: ["Netflix", "Prime Video"]
    },
    {
        id: 7,
        title: "Avatar",
        genre: "Sci-Fi",
        year: 2009,
        duration: "2h 42m",
        rating: 7.8,
        poster: "daniel hayes.png",
        description: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"],
        platforms: ["Disney+", "Prime Video"]
    }
];

// Sample reviews data
let reviews = [
    {
        id: 1,
        movieId: 1,
        movieTitle: "The Midnight Signal",
        reviewerName: "Tara P.",
        title: "Captivating and haunting",
        rating: 4.5,
        text: "A slow-burn mystery that rewards patience — excellent atmosphere, a terrific central performance, and one of the best endings of the year.",
        date: "2024-01-15"
    },
    {
        id: 2,
        movieId: 1,
        movieTitle: "The Midnight Signal",
        reviewerName: "R. Singh",
        title: "Stylish and unsettling",
        rating: 4.2,
        text: "Not everything clicks — the pacing is deliberate — but the visual design and soundscape create an immersive experience.",
        date: "2024-01-10"
    },
    {
        id: 3,
        movieId: 2,
        movieTitle: "F1",
        reviewerName: "Alex M.",
        title: "Mind-bending masterpiece",
        rating: 5.0,
        text: "Christopher Nolan's masterpiece that challenges your perception of reality. The visual effects are stunning and the story is incredibly complex yet engaging.",
        date: "2024-01-20"
    },
    {
        id: 4,
        movieId: 3,
        movieTitle: "WAR",
        reviewerName: "Sarah K.",
        title: "Perfect superhero film",
        rating: 5.0,
        text: "Heath Ledger's Joker is legendary. This film redefined what superhero movies could be - dark, complex, and deeply philosophical.",
        date: "2024-01-18"
    },
    {
        id: 5,
        movieId: 4,
        movieTitle: "Saiyaara",
        reviewerName: "Mike D.",
        title: "Classic storytelling",
        rating: 4.8,
        text: "A masterpiece of non-linear storytelling with unforgettable characters and dialogue that has become iconic in cinema history.",
        date: "2024-01-22"
    },
    {
        id: 6,
        movieId: 5,
        movieTitle: "Squid Game",
        reviewerName: "Lisa W.",
        title: "Emotional journey",
        rating: 4.9,
        text: "A powerful story about friendship, hope, and redemption. The performances are outstanding and the emotional impact is profound.",
        date: "2024-01-25"
    }
];

// Initialize the page
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id')) || 1;
    
    loadMovieDetails(movieId);
    loadMovieReviews(movieId);
    setupEventListeners();
});

// Load movie details
function loadMovieDetails(movieId) {
    const movie = movies.find(m => m.id === movieId);
    
    if (!movie) {
        showNotification('Movie not found', 'error');
        return;
    }

    // Update page title
    document.title = `${movie.title} - MovieReviewHub`;
    
    // Update movie information
    $('#moviePoster').attr('src', movie.poster).attr('alt', movie.title);
    $('#movieTitle').text(movie.title);
    $('#movieTitleReviews').text(movie.title);
    $('#movieGenre').text(movie.genre);
    $('#movieYear').text(movie.year);
    $('#movieDuration').text(movie.duration);
    $('#movieRating').text(`${movie.rating}/10`);
    $('#movieDescription').text(movie.description);
    
    // Update stars
    const stars = generateStars(movie.rating / 2);
    $('#movieStars').html(stars);
    
    // Update cast
    const castHtml = movie.cast.map(actor => `<span class="badge bg-secondary me-1 mb-1">${actor}</span>`).join('');
    $('#movieCast').html(castHtml);
    
    // Update platforms
    const platformsHtml = movie.platforms.map(platform => `<span class="badge bg-success me-1 mb-1">${platform}</span>`).join('');
    $('#moviePlatforms').html(platformsHtml);
    
    // Set movie ID for review form
    $('#movieId').val(movieId);
}

// Load movie reviews
function loadMovieReviews(movieId) {
    const movieReviews = reviews.filter(review => review.movieId === movieId);
    const container = $('#movieReviewsContainer');
    
    if (movieReviews.length === 0) {
        container.html('<div class="col-12 text-center"><h4 class="text-muted">No reviews yet. Be the first to review this movie!</h4></div>');
        return;
    }
    
    container.empty();
    
    movieReviews.forEach(review => {
        const reviewCard = createReviewCard(review);
        container.append(reviewCard);
    });
}

// Create review card
function createReviewCard(review) {
    const stars = generateStars(review.rating);
    
    return `
        <div class="col-lg-6 mb-4">
            <div class="review-card">
                <div class="review-header">
                    <h4 class="review-title">${review.title}</h4>
                    <div class="rating-stars">${stars}</div>
                </div>
                <div class="review-meta">
                    <strong>${review.reviewerName}</strong>
                </div>
                <p class="review-text">${review.text}</p>
                <div class="review-footer">
                    <span>${formatDate(review.date)}</span>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Setup event listeners
function setupEventListeners() {
    // Review form submission
    $('#reviewForm').submit(handleReviewSubmission);

    // Star rating interaction
    $('.star-rating i').click(function() {
        const rating = $(this).data('rating');
        setStarRating(rating);
    });

    // Star rating hover effects
    $('.star-rating i').hover(
        function() {
            const rating = $(this).data('rating');
            highlightStars(rating);
        },
        function() {
            const currentRating = $('#ratingValue').val();
            highlightStars(currentRating);
        }
    );
}

// Set star rating
function setStarRating(rating) {
    $('#ratingValue').val(rating);
    highlightStars(rating);
}

// Highlight stars up to given rating
function highlightStars(rating) {
    $('.star-rating i').each(function(index) {
        if (index < rating) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
}

// Handle review form submission
function handleReviewSubmission(e) {
    e.preventDefault();

    const movieId = parseInt($('#movieId').val());
    const reviewerName = $('#reviewerName').val().trim();
    const reviewTitle = $('#reviewTitle').val().trim();
    const rating = parseInt($('#ratingValue').val());
    const reviewText = $('#reviewText').val().trim();

    if (rating === 0) {
        alert('Please select a rating');
        return;
    }

    const movie = movies.find(m => m.id === movieId);
    const newReview = {
        id: reviews.length + 1,
        movieId: movieId,
        movieTitle: movie.title,
        reviewerName: reviewerName,
        title: reviewTitle,
        rating: rating,
        text: reviewText,
        date: new Date().toISOString().split('T')[0]
    };

    reviews.unshift(newReview);
    loadMovieReviews(movieId);
    
    // Reset form
    $('#reviewForm')[0].reset();
    $('#ratingValue').val('0');
    highlightStars(0);
    
    // Close modal
    $('#submitReviewModal').modal('hide');
    
    // Show success message
    showNotification('Review submitted successfully!', 'success');
}

// Open review modal
function openReviewModal() {
    $('#submitReviewModal').modal('show');
}

// Watch movie function
function watchMovie() {
    const movieId = parseInt($('#movieId').val());
    const movie = movies.find(m => m.id === movieId);
    showNotification(`Opening ${movie.title} on your preferred platform...`, 'info');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const alertClass = type === 'success' ? 'alert-success' : 
                      type === 'error' ? 'alert-danger' : 'alert-info';
    
    const notification = $(`
        <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
             style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `);
    
    $('body').append(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.alert('close');
    }, 3000);
}
