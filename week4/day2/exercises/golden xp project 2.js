// --- Exercise 1: Sum elements ---
// Using reduce to accumulate the sum of all numbers
const numbers = [10, 20, 30, 40];
const sum = numbers.reduce((acc, val) => acc + val, 0);
console.log("Sum:", sum); // Output: 100


// --- Exercise 2 : Remove Duplicates ---
// Using Set, which automatically stores only unique values
const duplicateArray = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(duplicateArray)];
console.log("Unique Array:", uniqueArray); // Output: [1, 2, 3, 4, 5]


// --- Exercise 3 : Remove certain values ---
// Using filter(Boolean) is a shorthand to remove all "falsy" values
const sampleArray = [NaN, 0, 15, false, -22, '', undefined, 47, null];

const cleanArray = (arr) => arr.filter(value => {
    // This removes: null, 0, "", false, undefined, and NaN
    return value; 
});

console.log("Cleaned Array:", cleanArray(sampleArray)); // Output: [15, -22, 47]


// --- Exercise 4 : Repeat please ! ---
// Creating a repeat function with a default parameter
const repeat = (str, n = 1) => {
    let result = "";
    for (let i = 0; i < n; i++) {
        result += str;
    }
    return result;
};

console.log(repeat('Ha!', 3)); // Output: "Ha!Ha!Ha!"


// --- Exercise 5 : Turtle & Rabbit ---
const startLine = '     ||<- Start line';
let turtle = '🐢';
let rabbit = '🐇';

// To line them up, we use padStart to add spaces before the emojis
// The start line has 5 spaces before the "||", so we pad the emojis to match
turtle = turtle.padStart(9);
rabbit = rabbit.padStart(9);

console.log(startLine);
console.log(turtle);
console.log(rabbit);

/* Question: What happens when you run turtle = turtle.trim().padEnd(9, '='); ?
  
  Answer: 
  1. .trim() removes the extra spaces we just added.
  2. .padEnd(9, '=') adds "=" characters to the RIGHT of the turtle 
     until the total string length is 9.
  Result: '🐢======='
*/