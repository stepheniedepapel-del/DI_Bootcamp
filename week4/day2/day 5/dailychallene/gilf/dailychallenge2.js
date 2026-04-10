// Giphy API configuration
const API_KEY = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const RANDOM_GIF_URL = 'https://api.giphy.com/v1/gifs/random';

// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const gifContainer = document.getElementById('gifContainer');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const errorContainer = document.getElementById('errorContainer');

/**
 * Fetch a random GIF from Giphy API based on category
 * @param {string} category - The search category/tag
 * @returns {Promise<Object>} - The GIF data object
 */
async function fetchRandomGif(category) {
    try {
        // Construct URL with query parameters
        const url = `${RANDOM_GIF_URL}?api_key=${API_KEY}&tag=${encodeURIComponent(category)}&rating=g`;
        
        const response = await fetch(url);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if we got data back
        if (!data.data) {
            throw new Error('No GIF found for this category');
        }
        
        return data.data;
        
    } catch (error) {
        console.error('Error fetching GIF:', error);
        throw error;
    }
}

/**
 * Create GIF element with delete button
 * @param {Object} gifData - The GIF data from API
 * @returns {HTMLElement} - The GIF item container
 */
function createGifElement(gifData) {
    // Create container
    const gifItem = document.createElement('div');
    gifItem.className = 'gif-item';
    
    // Create image element
    const img = document.createElement('img');
    // Get URL from images object (using fixed_height for better performance)
    img.src = gifData.images.fixed_height.url;
    img.alt = gifData.title || 'Giphy GIF';
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.className = 'delete-btn';
    
    // Add click event to delete this specific GIF
    deleteBtn.addEventListener('click', function() {
        gifItem.remove();
    });
    
    // Append elements to container
    gifItem.appendChild(img);
    gifItem.appendChild(deleteBtn);
    
    return gifItem;
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function displayError(message) {
    errorContainer.innerHTML = `<p class="error-message">❌ ${message}</p>`;
    // Clear error after 3 seconds
    setTimeout(() => {
        errorContainer.innerHTML = '';
    }, 3000);
}

/**
 * Handle form submission
 */
async function handleSearch(event) {
    event.preventDefault();
    
    const category = searchInput.value.trim();
    
    if (!category) {
        displayError('Please enter a category');
        return;
    }
    
    try {
        // Show loading state
        searchForm.querySelector('button').textContent = 'Loading...';
        
        // Fetch random GIF
        const gifData = await fetchRandomGif(category);
        
        // Create and append GIF element
        const gifElement = createGifElement(gifData);
        gifContainer.appendChild(gifElement);
        
        // Clear input after successful search
        searchInput.value = '';
        
    } catch (error) {
        displayError(`Failed to fetch GIF: ${error.message}`);
    } finally {
        // Reset button text
        searchForm.querySelector('button').textContent = 'Search GIF';
    }
}

/**
 * Delete all GIFs from the container
 */
function deleteAllGifs() {
    // Confirm before deleting all
    if (gifContainer.children.length === 0) {
        displayError('No GIFs to delete!');
        return;
    }
    
    const confirmDelete = confirm('Are you sure you want to delete all GIFs?');
    
    if (confirmDelete) {
        gifContainer.innerHTML = '';
    }
}

// Event Listeners
searchForm.addEventListener('submit', handleSearch);
deleteAllBtn.addEventListener('click', deleteAllGifs);