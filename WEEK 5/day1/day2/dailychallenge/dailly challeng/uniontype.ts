// Exercise 1: Union Types

function processValue(value: string | number): string {
    if (typeof value === "number") {
        // Format as currency: $100.00
        return `$${value.toFixed(2)}`;
    } else {
        // Reverse the string
        return value.split("").reverse().join("");
    }
}

// Test the function
console.log(processValue(100));           // Output: $100.00
console.log(processValue(50.5));          // Output: $50.50
console.log(processValue("Hello"));       // Output: olleH
console.log(processValue("TypeScript"));  // Output: tpircSepyT