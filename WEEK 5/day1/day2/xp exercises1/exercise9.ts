// Exercise 9: Function Overloading with Default Parameters

// Function overload declarations
function greet(): string;
function greet(name: string): string;

// Function implementation
function greet(name?: string): string {
    if (name) {
        return `Hello, ${name}!`;
    }
    return "Hello, stranger!";
}

// Test the function
console.log(greet());           // Output: Hello, stranger!
console.log(greet("Alice"));    // Output: Hello, Alice!