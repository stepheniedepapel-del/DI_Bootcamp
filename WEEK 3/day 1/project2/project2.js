/**
 * JavaScript Exercises XP Gold - Exercises 1-3
 * Developers Institute 2026
 * All exercises in one file
 */

// ============================================================
// EXERCISE 1: DIVISIBLE BY THREE
// ============================================================

let numbers = [123, 8409, 100053, 333333333, 7];

console.log("Exercise 1 - Divisible by Three:");

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i] % 3 === 0);
}


// ============================================================
// EXERCISE 2: ATTENDANCE
// ============================================================

let guestList = {
    randy: "Germany",
    karla: "France",
    wendy: "Japan",
    norman: "England",
    sam: "Argentina"
};

console.log("\nExercise 2 - Attendance:");
console.log("(Note: Run in browser environment for prompt to work)");

let studentName = prompt("What is your name?");

if (studentName) {
    studentName = studentName.toLowerCase();
    
    if (studentName in guestList) {
        console.log(`Hi! I'm ${studentName}, and I'm from ${guestList[studentName]}.`);
    } else {
        console.log("Hi! I'm a guest.");
    }
}


// ============================================================
// EXERCISE 3: PLAYING WITH NUMBERS
// ============================================================

let age = [20, 5, 12, 43, 98, 55];

console.log("\nExercise 3 - Playing with Numbers:");

// 1. Sum of all numbers using simple for loop (no built-in methods)
let sum = 0;
for (let i = 0; i < age.length; i++) {
    sum = sum + age[i];
}
console.log("Sum of all ages:", sum);

// 2. Highest age using simple for loop (no built-in methods)
let highestAge = age[0];
for (let i = 1; i < age.length; i++) {
    if (age[i] > highestAge) {
        highestAge = age[i];
    }
}
console.log("Highest age:", highestAge);


// ============================================================
// END OF EXERCISES
// ============================================================
console.log("\n" + "=".repeat(50));
console.log("All XP Gold exercises completed successfully!");
console.log("=".repeat(50));