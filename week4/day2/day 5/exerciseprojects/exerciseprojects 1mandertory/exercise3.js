// Exercise 3: Async function to fetch Star Wars starship
async function fetchStarship() {
    try {
        const response = await fetch("https://www.swapi.tech/api/starships/9/");
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const objectStarWars = await response.json();
        console.log('Exercise 3 - Starship Data:', objectStarWars.result);
        
    } catch (error) {
        console.error('Error fetching starship:', error);
    }
}

// Call the async function
fetchStarship();