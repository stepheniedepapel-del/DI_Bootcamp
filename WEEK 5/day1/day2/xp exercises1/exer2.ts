// Exercise 2: Array Type Annotations

function sumNumbersInArray(arr: (number | string)[]): number {
    let sum: number = 0;
    
    for (let i = 0; i < arr.length; i++) {
        // Type guard: check if element is a number
        if (typeof arr[i] === "number") {
            sum += arr[i] as number;  // Type assertion or just sum += arr[i]
        }
    }
    
    return sum;
}

// Alternative using for...of loop
function sumNumbersInArrayV2(arr: (number | string)[]): number {
    let sum: number = 0;
    
    for (const item of arr) {
        if (typeof item === "number") {
            sum += item;
        }
    }
    
    return sum;
}

// Test the function
console.log(sumNumbersInArray([1, "two", 3, "four", 5]));        // Output: 9
console.log(sumNumbersInArray(["hello", 10, 20, "world", 30]));  // Output: 60
console.log(sumNumbersInArray(["a", "b", "c"]));                 // Output: 0
console.log(sumNumbersInArray([100, 200, 300]));                 // Output: 600