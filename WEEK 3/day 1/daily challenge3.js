/**
 * Daily Challenge: Array Methods & Bubble Sort
 * Developers Institute 2026
 */

const numbers = [5, 0, 9, 1, 7, 4, 2, 6, 3, 8];

console.log("=".repeat(50));
console.log("PART 1: CONVERT ARRAY TO STRING");
console.log("=".repeat(50));

// Using .toString() method
const stringToString = numbers.toString();
console.log("Using .toString():", stringToString);
console.log("Type:", typeof stringToString);

// Using .join() with different values
console.log("\nUsing .join() with different separators:");
console.log(".join('+'):", numbers.join("+"));
console.log(".join(' '):", numbers.join(" "));
console.log(".join(''):", numbers.join(""));
console.log(".join('-'):", numbers.join("-"));
console.log(".join(','):", numbers.join(","));


console.log("\n" + "=".repeat(50));
console.log("PART 2: BUBBLE SORT (DESCENDING ORDER)");
console.log("=".repeat(50));

// Create a copy to avoid modifying original array
let sortedNumbers = [...numbers];
console.log("Original array:", sortedNumbers);

// Bubble Sort Algorithm using nested for loops
// Outer loop: controls how many times we pass through the array
for (let i = 0; i < sortedNumbers.length; i++) {
    
    // Inner loop: compares adjacent elements
    // We subtract i because the last i elements are already sorted
    for (let j = 0; j < sortedNumbers.length - 1 - i; j++) {
        
        // Compare current element with next element
        // For DESCENDING order: if current is SMALLER than next, swap them
        if (sortedNumbers[j] < sortedNumbers[j + 1]) {
            
            // Swap using temporary variable
            let temp = sortedNumbers[j];
            sortedNumbers[j] = sortedNumbers[j + 1];
            sortedNumbers[j + 1] = temp;
            
            console.log(`Step [${i}][${j}]: Swapped ${sortedNumbers[j + 1]} and ${sortedNumbers[j]} → [${sortedNumbers.join(", ")}]`);
        }
    }
    
    console.log(`After pass ${i + 1}: [${sortedNumbers.join(", ")}]`);
}

console.log("\n" + "=".repeat(50));
console.log("FINAL RESULTS");
console.log("=".repeat(50));
console.log("Original array:", numbers);
console.log("Sorted array (descending):", sortedNumbers);
console.log("Expected result: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]");
console.log("Match:", JSON.stringify(sortedNumbers) === JSON.stringify([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));