// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const authModal = document.getElementById('auth-modal');
const closeModal = document.querySelector('.close-modal');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const listingsGrid = document.querySelector('.listings-grid');

// Sample property data (in a real app, this would come from an API)
const properties = [
    {
        id: 1,
        title: "Modern Apartment in Downtown",
        location: "New York, NY",
        bedrooms: 2,
        bathrooms: 1,
        area: 850,
        price: 2500,
        image: "images/property1.jpg",
        type: "Apartment",
        featured: true,
        coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
        id: 2,
        title: "Cozy Studio Near Central Park",
        location: "New York, NY",
        bedrooms: 1,
        bathrooms: 1,
        area: 500,
        price: 1800,
        image: "images/property2.jpg",
        type: "Studio",
        featured: true,
        coordinates: { lat: 40.7829, lng: -73.9654 }
    },
    {
        id: 3,
        title: "Luxury Condo with Ocean View",
        location: "Miami, FL",
        bedrooms: 3,
        bathrooms: 2,
        area: 1200,
        price: 3500,
        image: "images/property3.jpg",
        type: "Condo",
        featured: true,
        coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    {
        id: 4,
        title: "Charming House in Suburbs",
        location: "Chicago, IL",
        bedrooms: 4,
        bathrooms: 2,
        area: 1800,
        price: 2800,
        image: "images/property4.jpg",
        type: "House",
        featured: true,
        coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    {
        id: 5,
        title: "Modern Loft in Arts District",
        location: "Los Angeles, CA",
        bedrooms: 1,
        bathrooms: 1,
        area: 750,
        price: 2200,
        image: "images/property5.jpg",
        type: "Loft",
        featured: true,
        coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
        id: 6,
        title: "Spacious Family Home",
        location: "Austin, TX",
        bedrooms: 3,
        bathrooms: 2,
        area: 1600,
        price: 2100,
        image: "images/property6.jpg",
        type: "House",
        featured: true,
        coordinates: { lat: 30.2672, lng: -97.7431 }
    }
];

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Auth Modal
loginBtn.addEventListener('click', () => {
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

signupBtn.addEventListener('click', () => {
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Switch to signup tab
    document.querySelector('.tab-btn[data-tab="signup"]').click();
});

closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// Render Featured Properties
function renderFeaturedProperties() {
    listingsGrid.innerHTML = '';
    
    const featuredProperties = properties.filter(property => property.featured);
    
    featuredProperties.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.className = 'listing-card';
        propertyCard.innerHTML = `
            <div class="listing-img">
                <img src="${property.image}" alt="${property.title}">
                <span class="listing-badge">${property.type}</span>
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${property.title}</h3>
                <div class="listing-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${property.location}</span>
                </div>
                <div class="listing-features">
                    <span class="listing-feature">
                        <i class="fas fa-bed"></i> ${property.bedrooms} Bed
                    </span>
                    <span class="listing-feature">
                        <i class="fas fa-bath"></i> ${property.bathrooms} Bath
                    </span>
                    <span class="listing-feature">
                        <i class="fas fa-ruler-combined"></i> ${property.area} sqft
                    </span>
                </div>
                <div class="listing-price">
                    $${property.price}<span>/month</span>
                </div>
            </div>
        `;
        
        propertyCard.addEventListener('click', () => {
            window.location.href = `property.html?id=${property.id}`;
        });
        
        listingsGrid.appendChild(propertyCard);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProperties();
    
    // Set min date for check-in (today)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('check-in').min = today;
    
    // Update check-out min date when check-in changes
    document.getElementById('check-in').addEventListener('change', function() {
        document.getElementById('check-out').min = this.value;
    });
    
    // Search form submission
    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const location = document.getElementById('location').value;
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const guests = document.getElementById('guests').value;
        
        // In a real app, this would redirect to search results
        console.log('Search submitted:', { location, checkIn, checkOut, guests });
        alert(`Searching for rentals in ${location} from ${checkIn} to ${checkOut} for ${guests} guests`);
    });
});
