/**
 * JavaScript Exercises XP - Exercises 1-7
 * Developers Institute 2026
 * All exercises in one file
 */

// ============================================================
// EXERCISE 1: LIST OF PEOPLE
// ============================================================

const people = ["Greg", "Mary", "Devon", "James"];

// Part I - Review about arrays

// Remove "Greg" from the people array
people.shift();

// Replace "James" with "Jason"
people[people.indexOf("James")] = "Jason";

// Add your name to the end of the people array
people.push("YourName");

// Console.log Mary's index
console.log("Exercise 1 - Mary's index:", people.indexOf("Mary"));

// Make a copy using slice (excluding "Mary" and your name)
// Array is now: ["Mary", "Devon", "Jason", "YourName"]
// Slice from index 1 to 3 (exclusive) to get ["Devon", "Jason"]
const peopleCopy = people.slice(1, 3);
console.log("Exercise 1 - Copy without Mary and your name:", peopleCopy);

// Index of "Foo" - returns -1 because "Foo" doesn't exist in the array
console.log("Exercise 1 - Index of 'Foo':", people.indexOf("Foo"), "(returns -1 because not found)");

// Create variable 'last' with the last element
// Relationship: last index = array.length - 1
const last = people[people.length - 1];
console.log("Exercise 1 - Last element:", last);

// Part II - Loops

// Loop through and console.log each person
console.log("\nExercise 1 - All people:");
for (let i = 0; i < people.length; i++) {
    console.log(people[i]);
}

// Loop and exit after console.log "Devon"
console.log("\nExercise 1 - Until Devon:");
for (let i = 0; i < people.length; i++) {
    console.log(people[i]);
    if (people[i] === "Devon") break;
}


// ============================================================
// EXERCISE 2: YOUR FAVORITE COLORS
// ============================================================

const colors = ["Blue", "Red", "Green", "Purple", "Orange"];
const suffixes = ["st", "nd", "rd", "th", "th"];

console.log("\nExercise 2 - Favorite Colors:");
for (let i = 0; i < colors.length; i++) {
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}


// ============================================================
// EXERCISE 3: REPEAT THE QUESTION
// ============================================================

console.log("\nExercise 3 - Repeat the Question:");
console.log("(Note: Run in browser environment for prompt to work)");

let userInput = prompt("Enter a number:");
let number = Number(userInput);

console.log("Type of prompt input:", typeof userInput); // string
console.log("Type after conversion:", typeof number); // number

// While loop - continues while number is smaller than 10
while (number < 10) {
    userInput = prompt("Number is too small. Enter a new number (must be 10 or greater):");
    number = Number(userInput);
}

console.log("Final number:", number);


// ============================================================
// EXERCISE 4: BUILDING MANAGEMENT
// ============================================================

const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent: {
        sarah: [3, 990],
        dan: [4, 1000],
        david: [1, 500],
    },
};

console.log("\nExercise 4 - Building Management:");

// Console.log the number of floors
console.log("Number of floors:", building.numberOfFloors);

// Console.log how many apartments are on floors 1 and 3
console.log("Apartments on floor 1:", building.numberOfAptByFloor.firstFloor);
console.log("Apartments on floor 3:", building.numberOfAptByFloor.thirdFloor);

// Console.log the second tenant and his number of rooms
const secondTenant = building.nameOfTenants[1];
const secondTenantRooms = building.numberOfRoomsAndRent[secondTenant.toLowerCase()][0];
console.log(`Second tenant is ${secondTenant}, he has ${secondTenantRooms} rooms`);

// Check if sum of Sarah's and David's rent is bigger than Dan's rent
const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
    console.log("Dan's rent increased to 1200");
}


// ============================================================
// EXERCISE 5: FAMILY
// ============================================================

const family = {
    father: "John",
    mother: "Jane",
    son: "Mike",
    daughter: "Emma"
};

console.log("\nExercise 5 - Family Keys:");
for (let key in family) {
    console.log(key);
}

console.log("\nExercise 5 - Family Values:");
for (let key in family) {
    console.log(family[key]);
}


// ============================================================
// EXERCISE 6: RUDOLF
// ============================================================

const details = {
    my: 'name',
    is: 'Rudolf',
    the: 'reindeer'
};

console.log("\nExercise 6 - Rudolf:");
let sentence = "";
for (let key in details) {
    sentence += key + " " + details[key] + " ";
}
console.log(sentence.trim());


// ============================================================
// EXERCISE 7: SECRET GROUP
// ============================================================

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

console.log("\nExercise 7 - Secret Group:");

// Get first letter of each name, sort alphabetically, join together
const firstLetters = [];
for (let i = 0; i < names.length; i++) {
    firstLetters.push(names[i][0]);
}
firstLetters.sort();
const secretSociety = firstLetters.join("");
console.log("Secret society name:", secretSociety);


// ============================================================
// END OF EXERCISES
// ============================================================
console.log("\n" + "=".repeat(50));
console.log("All XP exercises completed successfully!");
console.log("=".repeat(50));