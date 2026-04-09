// Array of planet objects with their properties and moons
const solarSystem = [
    {
        name: "Mercury",
        color: "#A5A5A5",
        moons: []
    },
    {
        name: "Venus",
        color: "#E3BB76",
        moons: []
    },
    {
        name: "Earth",
        color: "#22A6B3",
        moons: ["Moon"]
    },
    {
        name: "Mars",
        color: "#FF6B6B",
        moons: ["Phobos", "Deimos"]
    },
    {
        name: "Jupiter",
        color: "#D4A373",
        moons: ["Io", "Europa", "Ganymede", "Callisto"]
    },
    {
        name: "Saturn",
        color: "#F4E4BA",
        moons: ["Titan", "Enceladus", "Mimas", "Tethys", "Dione", "Rhea"]
    },
    {
        name: "Uranus",
        color: "#7DE3F4",
        moons: ["Miranda", "Ariel", "Umbriel", "Titania", "Oberon"]
    },
    {
        name: "Neptune",
        color: "#3B3B98",
        moons: ["Triton", "Proteus", "Nereid"]
    }
];

// Get the section element where planets will be appended
const section = document.querySelector('.listPlanets');

// Loop through each planet in the solar system
solarSystem.forEach((planet, index) => {
    // Create a div for the planet
    const planetDiv = document.createElement('div');
    
    // Add the 'planet' class
    planetDiv.classList.add('planet');
    
    // Set the background color
    planetDiv.style.backgroundColor = planet.color;
    
    // Optional: Add planet name as text
    planetDiv.textContent = planet.name;
    planetDiv.style.color = 'white';
    planetDiv.style.display = 'flex';
    planetDiv.style.alignItems = 'center';
    planetDiv.style.justifyContent = 'center';
    
    // BONUS: Create moons for this planet
    planet.moons.forEach((moon, moonIndex) => {
        const moonDiv = document.createElement('div');
        moonDiv.classList.add('moon');
        
        // Position moons around the planet in a circular pattern
        const angle = (moonIndex / planet.moons.length) * 2 * Math.PI;
        const distance = 70; // Distance from planet center
        const x = Math.cos(angle) * distance + 35; // +35 to center relative to planet
        const y = Math.sin(angle) * distance + 35;
        
        moonDiv.style.left = `${x}px`;
        moonDiv.style.top = `${y}px`;
        
        // Optional: Add moon name as title attribute (tooltip)
        moonDiv.title = moon;
        
        // Append moon to the planet div
        planetDiv.appendChild(moonDiv);
    });
    
    // Append the planet div to the section
    section.appendChild(planetDiv);
});