// Exercise 1: Fetch and display a random GIF from Giphy
const apiKey = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My'; // Use the API KEY from previous exercises
const giphyUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=g`;

async function fetchRandomGif() {
    try {
        const response = await fetch(giphyUrl);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Get the GIF URL from the images object
        // The path is: data.data.images.original.url (or fixed_height.url, etc.)
        const gifUrl = data.data.images.original.url;
        
        // Create an image element and append to page
        const img = document.createElement('img');
        img.src = gifUrl;
        img.alt = 'Random Giphy GIF';
        img.style.maxWidth = '500px'; // Optional: limit size
        
        document.body.appendChild(img);
        
    } catch (error) {
        console.error('Error fetching GIF:', error);
    }
}

// Call the function
fetchRandomGif();