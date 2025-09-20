# MovieReviewHub - Movie Review Website

A comprehensive movie review website built with HTML, CSS, JavaScript, Bootstrap, and jQuery that allows users to browse movies, read reviews, and submit their own ratings and comments.

## Features

### 🎬 Movie Listing
- Display movies with posters, titles, and brief descriptions
- Responsive grid layout using Bootstrap
- Hover effects and smooth animations
- Star ratings and numerical ratings

### 🔍 Search & Filter
- Search movies by title, genre, cast, or description
- Filter by genre (Action, Comedy, Drama, Horror, Romance, Thriller, Sci-Fi)
- Filter by year (2020-2024)
- Filter by rating (1+ to 4+ stars)
- Clear all filters functionality

### ⭐ Review System
- Submit reviews with star ratings (1-5 stars)
- Interactive star rating system
- Review form with movie selection, reviewer name, title, and comments
- Display latest reviews on homepage
- Movie-specific review pages

### 📱 Responsive Design
- Mobile-first approach using Bootstrap 5
- Responsive navigation with collapsible menu
- Adaptive grid layouts for different screen sizes
- Touch-friendly interface elements

### 🎨 Modern UI/UX
- Dark theme with gold accent colors
- Smooth transitions and hover effects
- Custom fonts (Cinzel for headings, Montserrat for body)
- Glass morphism effects
- Custom scrollbar styling

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Custom styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Bootstrap 5** - Responsive framework and components
- **jQuery** - DOM manipulation and event handling
- **Font Awesome** - Icons and visual elements
- **Google Fonts** - Typography

## File Structure

```
movie/
├── index.html              # Main homepage
├── movie-detail.html       # Individual movie detail page
├── movie.css              # Main stylesheet
├── script.js              # Homepage JavaScript
├── movie-detail.js        # Movie detail page JavaScript
├── README.md              # Project documentation
└── images/                # Movie posters and assets
    ├── freedom.jpg
    ├── image1.png
    ├── image2.png
    ├── image3.png
    ├── image4.jpg
    ├── maya.jpg
    ├── daniel hayes.png
    ├── Rina Gupta.png
    ├── netflix-logo.jpg
    ├── amazon.jpg
    └── mubi.png
```

## Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in a web browser
3. **Explore the features**:
   - Browse movies on the homepage
   - Use search and filters to find specific movies
   - Click "Watch" to view movie details
   - Click "Review" to submit a review
   - Navigate between pages using the navigation menu

## Features in Detail

### Homepage (`index.html`)
- Hero section with search functionality
- Filter controls (genre, year, rating)
- Movie grid with 6 sample movies
- Latest reviews section
- Submit review modal

### Movie Detail Page (`movie-detail.html`)
- Detailed movie information
- Cast and platform listings
- Movie-specific reviews
- Review submission form
- Navigation back to homepage

### Interactive Elements
- **Star Ratings**: Click to rate movies and reviews
- **Search**: Real-time search across movie data
- **Filters**: Multiple filter options with instant results
- **Modals**: Bootstrap modals for review submission
- **Smooth Scrolling**: Navigation between page sections

## Sample Data

The website includes sample data for 6 movies:
1. The Midnight Signal (Thriller, 2024)
2. Inception (Sci-Fi, 2010)
3. The Dark Knight (Action, 2008)
4. Pulp Fiction (Drama, 1994)
5. The Shawshank Redemption (Drama, 1994)
6. Forrest Gump (Drama, 1994)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Adding New Movies
Edit the `movies` array in both `script.js` and `movie-detail.js`:

```javascript
const movies = [
    {
        id: 7,
        title: "Your Movie Title",
        genre: "Genre",
        year: 2024,
        duration: "2h 0m",
        rating: 8.5,
        poster: "poster.jpg",
        description: "Movie description...",
        cast: ["Actor 1", "Actor 2"],
        platforms: ["Platform 1", "Platform 2"]
    }
    // ... existing movies
];
```

### Styling Customization
Modify CSS variables in `movie.css`:

```css
:root {
  --primary: #ffc107;    /* Gold accent color */
  --bg: #07060a;         /* Background color */
  --card: #0f1014;       /* Card background */
  --muted: #9aa0a6;      /* Muted text color */
}
```

## Future Enhancements

- User authentication system
- Database integration
- Advanced filtering options
- Movie recommendations
- Social sharing features
- Admin panel for content management
- API integration for real movie data

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions, please contact the development team.

---

**MovieReviewHub** - Your ultimate destination for movie reviews and ratings! 🎬⭐
