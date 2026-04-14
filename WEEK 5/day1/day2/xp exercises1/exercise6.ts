// Exercise 6: Object Type Annotations

// Define the Person type
type Person = {
    name: string;
    age: number;
};

// Create the function
function createPerson(name: string, age: number): Person {
    return {
        name: name,
        age: age
    };
}

// Test the function
const person = createPerson("Alice", 25);
console.log(person); // Output: { name: 'Alice', age: 25 }