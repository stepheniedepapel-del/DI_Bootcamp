class Car {
    public readonly make: string;
    private readonly model: string;
    public year: number;

    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    getCarDetails(): string {
        return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`;
    }
}

// Create instance
const myCar = new Car("Toyota", "Camry", 2023);

console.log(myCar.getCarDetails());
// Output: Make: Toyota, Model: Camry, Year: 2023

// Attempt to modify readonly properties (these will cause TypeScript errors)
// myCar.make = "Honda";      // ❌ Error: Cannot assign to 'make' because it is a read-only property
// myCar.model = "Accord";    // ❌ Error: Cannot assign to 'model' because it is a read-only property

// This works fine - year is not readonly
myCar.year = 2024;
console.log(myCar.getCarDetails());
// Output: Make: Toyota, Model: Camry, Year: 2024