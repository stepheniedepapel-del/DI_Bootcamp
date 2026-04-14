// Exercise 3: Type Aliases

// Define the type alias
type AdvancedUser = {
    name: string;
    age: number;
    address?: string;  // Optional property
};

function introduceAdvancedUser(user: AdvancedUser): string {
    let greeting: string = `Hello, my name is ${user.name} and I am ${user.age} years old.`;
    
    // Check if address exists (optional property)
    if (user.address) {
        greeting += ` I live at ${user.address}.`;
    }
    
    return greeting;
}

// Test with address
const userWithAddress: AdvancedUser = {
    name: "Alice",
    age: 28,
    address: "123 Main Street, New York"
};

// Test without address
const userWithoutAddress: AdvancedUser = {
    name: "Bob",
    age: 35
};

console.log(introduceAdvancedUser(userWithAddress));
// Output: Hello, my name is Alice and I am 28 years old. I live at 123 Main Street, New York.

console.log(introduceAdvancedUser(userWithoutAddress));
// Output: Hello, my name is Bob and I am 35 years old.