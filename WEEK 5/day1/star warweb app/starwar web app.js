// 1. Select the elements from the DOM
const btn = document.getElementById('fetch-button');
const displayArea = document.getElementById('display-area');

// 2. Function to show the loading spinner
const displayLoading = () => {
    displayArea.innerHTML = `
        <div class="loading-icon">
            <i class="fa-solid fa-spinner fa-spin fa-3x"></i>
            <p>Loading...</p>
        </div>
    `;
};

// 3. Function to display the character data
const renderCharacter = (char, planet) => {
    displayArea.innerHTML = `
        <h2>${char.name}</h2>
        <p><strong>Height:</strong> ${char.height}</p>
        <p><strong>Gender:</strong> ${char.gender}</p>
        <p><strong>Birth Year:</strong> ${char.birth_year}</p>
        <p><strong>Home World:</strong> ${planet}</p>
    `;
};

// 4. Function to display error message
const displayError = () => {
    displayArea.innerHTML = `
        <p style="color: red;">Oh no! That person isn't available.</p>
    `;
};

// 5. The Main Async Function
const getCharacter = async () => {
    displayLoading(); // Start the spinner immediately

    try {
        const randomId = Math.floor(Math.random() * 83) + 1;
        const response = await fetch(`https://www.swapi.tech/api/people/${randomId}`);
        
        if (!response.ok) throw new Error("Character not found");

        const data = await response.json();
        const character = data.result.properties;

        // Fetch the planet name (the API gives a URL for homeworld)
        const planetResponse = await fetch(character.homeworld);
        const planetData = await planetResponse.json();
        const planetName = planetData.result.properties.name;

        // Success! Display the info
        renderCharacter(character, planetName);

    } catch (error) {
        displayError();
        console.error("Fetch Error:", error);
    }
};

// 6. Attach the event listener
btn.addEventListener('click', getCharacter);