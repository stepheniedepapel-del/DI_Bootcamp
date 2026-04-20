// Base interface
interface Shape {
    color: string;
    getArea(): number;
}

// Extended interface with readonly and optional properties
interface Rectangle extends Shape {
    readonly width: number;
    readonly height: number;
    description?: string; // Optional property
    getPerimeter(): number;
}

// Class implementing the extended interface
class RectangleImpl implements Rectangle {
    color: string;
    readonly width: number;
    readonly height: number;
    description?: string;

    constructor(color: string, width: number, height: number, description?: string) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.description = description;
    }

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

// Create instances
const rect1 = new RectangleImpl("Red", 10, 5);
const rect2 = new RectangleImpl("Blue", 8, 4, "A nice blue rectangle");

console.log(`Rectangle 1 - Color: ${rect1.color}, Area: ${rect1.getArea()}, Perimeter: ${rect1.getPerimeter()}`);
// Output: Rectangle 1 - Color: Red, Area: 50, Perimeter: 30

console.log(`Rectangle 2 - ${rect2.description}, Area: ${rect2.getArea()}`);
// Output: Rectangle 2 - A nice blue rectangle, Area: 32

// Attempting to modify readonly properties will fail
// rect1.width = 20;  // ❌ Error: Cannot assign to 'width' because it is a read-only property