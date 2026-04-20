// Operation function type
type OperationFunction = (a: number, b: number) => number;

// Interface with function type property
interface Calculator {
    a: number;
    b: number;
    operate(operation: OperationFunction): number;
}

// Class implementing the interface
class AdvancedCalculator implements Calculator {
    a: number;
    b: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }

    // Implement the operate method that accepts a function
    operate(operation: OperationFunction): number {
        return operation(this.a, this.b);
    }

    // Predefined operations
    add(): number {
        return this.operate((x, y) => x + y);
    }

    subtract(): number {
        return this.operate((x, y) => x - y);
    }

    multiply(): number {
        return this.operate((x, y) => x * y);
    }

    divide(): number {
        return this.operate((x, y) => {
            if (y === 0) throw new Error("Cannot divide by zero");
            return x / y;
        });
    }

    // Custom power operation
    power(): number {
        return this.operate((x, y) => Math.pow(x, y));
    }
}

// Test Exercise 3
console.log("\n" + "=".repeat(60));
console.log("EXERCISE 3: Complex Interfaces with Function Types");
console.log("=".repeat(60));

const calc = new AdvancedCalculator(10, 3);

console.log(`Numbers: ${calc.a} and ${calc.b}`);
console.log(`Add: ${calc.add()}`);
console.log(`Subtract: ${calc.subtract()}`);
console.log(`Multiply: ${calc.multiply()}`);
console.log(`Divide: ${calc.divide().toFixed(2)}`);
console.log(`Power: ${calc.power()}`);

// Using custom operation directly
const customResult = calc.operate((x, y) => (x + y) * 2);
console.log(`Custom operation (x+y)*2: ${customResult}`);