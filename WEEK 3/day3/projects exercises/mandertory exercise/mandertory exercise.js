// Get DOM elements
const form = document.getElementById('libform');
const storyContainer = document.getElementById('story-container');
const storySpan = document.getElementById('story');
const shuffleButton = document.getElementById('shuffle-button');

// Store current values for shuffle functionality
let currentValues = {};

// Array of story templates
const storyTemplates = [
    (noun, adjective, person, verb, place) => 
        `Yesterday, ${person} went to the ${place} to buy a ${adjective} ${noun}. ` +
        `Suddenly, it started to ${verb} right in the middle of the aisle! ` +
        `Everyone stared in shock as the ${noun} began ${verb}ing even faster. ` +
        `${person} smiled and said, "This is exactly what I wanted!"`,

    (noun, adjective, person, verb, place) => 
        `Once upon a time, ${person} discovered a ${adjective} ${noun} hidden in the ${place}. ` +
        `Without thinking twice, they decided to ${verb} with it all day long. ` +
        `The ${noun} was so ${adjective} that it made everyone at the ${place} start to ${verb} too! ` +
        `It was the best day ever for ${person}.`,

    (noun, adjective, person, verb, place) => 
        `${person} woke up and realized their pet ${noun} had become ${adjective} overnight! ` +
        `They rushed to the ${place} hoping to find a cure. ` +
        `The only solution was to ${verb} three times while holding the ${noun}. ` +
        `After doing so, the ${noun} returned to normal, but ${person} couldn't stop ${verb}ing!`,

    (noun, adjective, person, verb, place) => 
        `At the ${place}, ${person} entered a contest to find the most ${adjective} ${noun}. ` +
        `The competition was fierce, but when ${person} started to ${verb}, ` +
        `the judges were amazed! They declared the ${noun} the winner ` +
        `and gave ${person} a trophy made of ${adjective} gold.`,

    (noun, adjective, person, verb, place) => 
        `Breaking news: ${person} was spotted at the ${place} trying to ${verb} ` +
        `while balancing a ${adjective} ${noun} on their head! ` +
        `Witnesses say the ${noun} never fell, even when ${person} started to ${verb} faster. ` +
        `Experts call it "The most ${adjective} event of the year!"`,

    (noun, adjective, person, verb, place) => 
        `${person} had a dream about a ${adjective} ${noun} that could ${verb}. ` +
        `The next morning, they went to the ${place} and found exactly that! ` +
        `Now ${person} spends every day watching the ${noun} ${verb} at the ${place}, ` +
        `and claims it's the most ${adjective} thing in the world.`
];

// Form submission handler
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get values from inputs
    const noun = document.getElementById('noun').value.trim();
    const adjective = document.getElementById('adjective').value.trim();
    const person = document.getElementById('person').value.trim();
    const verb = document.getElementById('verb').value.trim();
    const place = document.getElementById('place').value.trim();
    
    // Validate that all fields are filled
    if (!noun || !adjective || !person || !verb || !place) {
        alert('Please fill in all fields before generating your story!');
        return;
    }
    
    // Store values for shuffle functionality
    currentValues = { noun, adjective, person, verb, place };
    
    // Generate and display story
    generateStory();
    
    // Show story container and shuffle button
    storyContainer.style.display = 'block';
    shuffleButton.style.display = 'inline-block';
    
    // Scroll to story
    storyContainer.scrollIntoView({ behavior: 'smooth' });
});

// Shuffle button handler
shuffleButton.addEventListener('click', function() {
    generateStory();
});

// Function to generate random story
function generateStory() {
    const { noun, adjective, person, verb, place } = currentValues;
    
    // Get random template
    const randomIndex = Math.floor(Math.random() * storyTemplates.length);
    const template = storyTemplates[randomIndex];
    
    // Generate story text
    const storyText = template(noun, adjective, person, verb, place);
    
    // Highlight the user's words in the story
    const highlightedStory = storyText
        .replace(new RegExp(`\\b${noun}\\b`, 'gi'), `<span class="highlight">${noun}</span>`)
        .replace(new RegExp(`\\b${adjective}\\b`, 'gi'), `<span class="highlight">${adjective}</span>`)
        .replace(new RegExp(`\\b${person}\\b`, 'gi'), `<span class="highlight">${person}</span>`)
        .replace(new RegExp(`\\b${verb}\\b`, 'gi'), `<span class="highlight">${verb}</span>`)
        .replace(new RegExp(`\\b${place}\\b`, 'gi'), `<span class="highlight">${place}</span>`);
    
    storySpan.innerHTML = highlightedStory;
    
    console.log('Story generated:', storyText);
    console.log('Current values:', currentValues);
}

// Add input validation feedback
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#2ecc71';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#667eea';
    });
});