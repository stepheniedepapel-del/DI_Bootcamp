// Exercise 4: Optional Parameters

function welcomeUser(name: string, greeting?: string): string {
    // Use default value if greeting is not provided
    const actualGreeting: string = greeting || "Hello";
    
    return `${actualGreeting}, ${name}!`;
}

// Alternative syntax with default parameter (cleaner)
function welcomeUserV2(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

// Test with custom greeting
console.log(welcomeUser("Alice", "Welcome"));     // Output: Welcome, Alice!
console.log(welcomeUser("Bob", "Good morning"));  // Output: Good morning, Bob!

// Test without greeting (uses default)
console.log(welcomeUser("Charlie"));              // Output: Hello, Charlie!
console.log(welcomeUser("Diana"));                // Output: Hello, Diana!