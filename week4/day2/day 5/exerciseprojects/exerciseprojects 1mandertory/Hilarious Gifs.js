// Exercise 1: Fetch hilarious gifs from Giphy API
const giphyUrl = 'https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

fetch(giphyUrl)
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Exercise 1 - Giphy Data:', data);
    })
    .catch(error => {
        console.error('Error fetching gifs:', error);
    });