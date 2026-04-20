// Base class with readonly property
class Device {
    readonly serialNumber: string;
    manufacturer: string;

    constructor(serialNumber: string, manufacturer: string) {
        this.serialNumber = serialNumber;
        this.manufacturer = manufacturer;
    }

    getDeviceInfo(): string {
        return `Serial: ${this.serialNumber}, Manufacturer: ${this.manufacturer}`;
    }
}

// Laptop extends Device
class Laptop extends Device {
    model: string;
    price: number;

    constructor(serialNumber: string, manufacturer: string, model: string, price: number) {
        super(serialNumber, manufacturer);
        this.model = model;
        this.price = price;
    }

    // Override to include laptop-specific info
    getDeviceInfo(): string {
        return `${super.getDeviceInfo()}, Model: ${this.model}, Price: $${this.price}`;
    }

    updatePrice(newPrice: number): void {
        this.price = newPrice;
        console.log(`💰 Price updated to $${newPrice}`);
    }

    updateModel(newModel: string): void {
        this.model = newModel;
        console.log(`💻 Model updated to ${newModel}`);
    }

    // Cannot update serialNumber - it's readonly!
    // updateSerial(newSerial: string): void {
    //     this.serialNumber = newSerial; // ❌ Error: Cannot assign to 'serialNumber' because it is a read-only property
    // }
}

// Test Exercise 4
console.log("\n" + "=".repeat(60));
console.log("EXERCISE 4: Readonly Properties in Complex Inheritance");
console.log("=".repeat(60));

const laptop = new Laptop("SN-12345-XYZ", "Dell", "XPS 15", 1500);
console.log(laptop.getDeviceInfo());

// These work fine - mutable properties
laptop.updatePrice(1200);
laptop.updateModel("XPS 17");

// This would fail:
// laptop.serialNumber = "SN-99999"; // ❌ Compile error!

console.log(laptop.getDeviceInfo());
console.log(`Serial Number (readonly): ${laptop.serialNumber}`);