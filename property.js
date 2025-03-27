// Property Details Page
document.addEventListener('DOMContentLoaded', () => {
    // Get property ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = parseInt(urlParams.get('id'));
    
    // Find the property in our data (in a real app, this would be an API call)
    const property = properties.find(p => p.id === propertyId);
    
    if (property) {
        // Populate property details
        document.getElementById('property-title').textContent = property.title;
        document.getElementById('property-location').textContent = property.location;
        document.getElementById('property-type').textContent = property.type;
        document.getElementById('main-property-image').src = property.image;
        document.getElementById('main-property-image').alt = property.title;
        document.getElementById('booking-price').textContent = `$${property.price}`;
        
        // Generate description based on property details
        const description = `This beautiful ${property.type.toLowerCase()} features ${property.bedrooms} bedroom${property.bedrooms > 1 ? 's' : ''} and ${property.bathrooms} bathroom${property.bathrooms > 1 ? 's' : ''} across ${property.area} square feet of living space. Located in the heart of ${property.location.split(',')[0]}, this property offers modern amenities and convenient access to local attractions.`;
        document.getElementById('property-description').textContent = description;
        
        // Set up thumbnail click events
        document.querySelectorAll('.thumbnail img').forEach(thumb => {
            thumb.addEventListener('click', () => {
                document.getElementById('main-property-image').src = thumb.src;
            });
        });
        
        // Set up booking date restrictions
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('booking-check-in').min = today;
        
        document.getElementById('booking-check-in').addEventListener('change', function() {
            document.getElementById('booking-check-out').min = this.value;
        });
        
        // Book now button
        document.querySelector('.btn-book').addEventListener('click', () => {
            const checkIn = document.getElementById('booking-check-in').value;
            const checkOut = document.getElementById('booking-check-out').value;
            const guests = document.getElementById('booking-guests').value;
            
            if (!checkIn || !checkOut) {
                alert('Please select check-in and check-out dates');
                return;
            }
            
            alert(`Booking request sent for ${property.title} from ${checkIn} to ${checkOut} for ${guests} guest${guests > 1 ? 's' : ''}. Total: $${property.price}`);
        });
        
        // Render similar properties
        renderSimilarProperties(property);
    } else {
        document.getElementById('property-title').textContent = 'Property not found';
        document.querySelector('.property-content').innerHTML = `
            <div class="property-info">
                <p>The property you're looking for doesn't exist or has been removed.</p>
                <a href="../index.html" class="btn btn-primary">Back to Home</a>
            </div>
        `;
    }
});

function renderSimilarProperties(currentProperty) {
    const similarProperties = properties
        .filter(p => p.id !== currentProperty.id && p.location === currentProperty.location)
        .slice(0, 4);
    
    const listingsGrid = document.querySelector('.similar-properties .listings-grid');
    listingsGrid.innerHTML = '';
    
    if (similarProperties.length === 0) {
        listingsGrid.innerHTML = '<p>No similar properties found.</p>';
        return;
    }
    
    similarProperties.forEach(property => {
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
