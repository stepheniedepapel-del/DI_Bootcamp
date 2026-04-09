// Words in the stars - Daily Challenge

// Prompt user for words separated by commas
let input = prompt("Enter several words separated by commas:");

// Split the input into an array and trim whitespace from each word
let words = input.split(",").map(word => word.trim());

// Find the length of the longest word
let maxLength = 0;
for (let word of words) {
    if (word.length > maxLength) {
        maxLength = word.length;
    }
}

// Create the top and bottom border (stars)
let border = "*".repeat(maxLength + 4); // +4 for the stars and spaces on each side

// Print the frame
console.log(border);

// Print each word with proper padding
for (let word of words) {
    // Calculate spaces needed to align the right border
    let spaces = " ".repeat(maxLength - word.length);
    console.log("* " + word + spaces + " *");
}

console.log(border);