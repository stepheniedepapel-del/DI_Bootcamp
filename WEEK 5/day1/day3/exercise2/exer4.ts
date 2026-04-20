// Interface with method signature - clearer and more common
interface Operation {
    execute(a: number, b: number): number;
}

class Addition implements Operation {
    execute(a: number, b: number): number {
        return a + b;
    }
}

class Multiplication implements Operation {
    execute(a: number, b: number): number {
        return a * b;
    }
}

// Create instances and use them
const add = new Addition();
const multiply = new Multiplication();

console.log(`10 + 5 = ${add.execute(10, 5)}`);        // Output: 10 + 5 = 15
console.log(`10 * 5 = ${multiply.execute(10, 5)}`); // Output: 10 * 5 = 50