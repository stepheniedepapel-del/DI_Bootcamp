// Base class Shape with static members
class Shape {
    // Static property to count all shapes
    static totalShapes: number = 0;

    constructor() {
        Shape.totalShapes++; // Increment on every instance creation
    }

    // Static method - can be overridden in subclasses
    static getType(): string {
        return "Generic Shape";
    }

    // Instance method for area (to be overridden)
    calculateArea(): number {
        return 0;
    }

    // Static method to get total count
    static getTotalShapes(): number {
        return Shape.totalShapes;
    }
}

// Circle extends Shape
class Circle extends Shape {
    private radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    static getType(): string {
        return "Circle";
    }

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    static getTypeInfo(): string {
        return `${Circle.getType()} - Area formula: πr²`;
    }
}

// Square extends Shape
class Square extends Shape {
    private side: number;

    constructor(side: number) {
        super();
        this.side = side;
    }

    static getType(): string {
        return "Square";
    }

    calculateArea(): number {
        return this.side * this.side;
    }

    static getTypeInfo(): string {
        return `${Square.getType()} - Area formula: s²`;
    }
}

// Test Exercise 2
console.log("\n" + "=".repeat(60));
console.log("EXERCISE 2: Advanced Static Methods and Properties");
console.log("=".repeat(60));

console.log(`Total shapes before: ${Shape.getTotalShapes()}`);

const circle1 = new Circle(5);
const circle2 = new Circle(3);
const square1 = new Square(4);
const square2 = new Square(6);

console.log(`Shape.getType(): ${Shape.getType()}`);
console.log(`Circle.getType(): ${Circle.getType()}`);
console.log(`Square.getType(): ${Square.getType()}`);

console.log(`Circle 1 area: ${circle1.calculateArea().toFixed(2)}`);
console.log(`Square 1 area: ${square1.calculateArea()}`);

console.log(`Total shapes created: ${Shape.getTotalShapes()}`);
console.log(Circle.getTypeInfo());
console.log(Square.getTypeInfo());