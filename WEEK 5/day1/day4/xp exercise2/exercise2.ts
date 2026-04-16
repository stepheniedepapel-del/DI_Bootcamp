// ============================================
// Exercise 1: Combining Intersection Types with Type Guards
// ============================================

// Define the User interface
export {};
interface User {
    name: string;
    email: string;
}

// Define the Admin interface
interface Admin {
    adminLevel: number;
}

// Create an intersection type combining both
type AdminUser = User & Admin;

// Function that uses type guards to safely access properties
function getProperty(obj: AdminUser, propertyName: string): any | undefined {
    // Type guard: check if property exists on the object
    if (propertyName in obj) {
        return (obj as any)[propertyName];
    }
    return undefined;
}

// Test Exercise 1
const adminUser: AdminUser = {
    name: "Alice Johnson",
    email: "alice@company.com",
    adminLevel: 5
};

console.log("=== Exercise 1: Intersection Types with Type Guards ===");
console.log("Name:", getProperty(adminUser, "name"));           // "Alice Johnson"
console.log("Email:", getProperty(adminUser, "email"));         // "alice@company.com"
console.log("Admin Level:", getProperty(adminUser, "adminLevel")); // 5
console.log("Non-existent:", getProperty(adminUser, "age"));    // undefined


// ============================================
// Exercise 2: Type Casting with Generics
// ============================================

// Generic function that casts a value to a specific type using a constructor
function castToType<T>(value: any, constructor: new (arg: any) => T): T {
    return new constructor(value);
}

// Test Exercise 2
console.log("\n=== Exercise 2: Type Casting with Generics ===");

// Cast string to number
const stringToNumber = castToType("42", Number);
console.log("String '42' to Number:", stringToNumber, "Type:", typeof stringToNumber);

// Cast string to boolean
const stringToBool = castToType("true", Boolean);
console.log("String 'true' to Boolean:", stringToBool, "Type:", typeof stringToBool);

// Cast number to string (demonstrating flexibility)
const numberToString = castToType(123, String);
console.log("Number 123 to String:", numberToString, "Type:", typeof numberToString);


// ============================================
// Exercise 3: Type Assertions with Generic Constraints
// ============================================

// Generic function with constraints: only accepts number[] or string[]
function getArrayLength<T extends number[] | string[]>(arr: T): number {
    // Type assertion: we know arr has length property
    return (arr as Array<any>).length;
}

// Test Exercise 3
console.log("\n=== Exercise 3: Type Assertions with Generic Constraints ===");

const numArray: number[] = [1, 2, 3, 4, 5];
const strArray: string[] = ["apple", "banana", "cherry"];
const mixedArray: (string | number)[] = ["test", 1, "hello"]; // This won't work with our constraint

console.log("Number array length:", getArrayLength(numArray));  // 5
console.log("String array length:", getArrayLength(strArray));  // 3

// Alternative version with more flexible constraint
function getArrayLengthFlexible<T extends Array<any>>(arr: T): number {
    return arr.length;
}

console.log("Mixed array length (flexible):", getArrayLengthFlexible(mixedArray)); // 3


// ============================================
// Exercise 4: Generic Interfaces with Class Implementation
// ============================================

// Define generic interface Storage<T>
interface Storage<T> {
    add(item: T): void;
    get(index: number): T | undefined;
}

// Implement the interface in a Box class
class Box<T> implements Storage<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
        console.log(`Added: ${item}`);
    }

    get(index: number): T | undefined {
        if (index >= 0 && index < this.items.length) {
            return this.items[index];
        }
        return undefined;
    }

    // Helper method to display all items
    getAll(): T[] {
        return [...this.items];
    }
}

// Test Exercise 4
console.log("\n=== Exercise 4: Generic Interfaces with Class Implementation ===");

// Box of strings
const stringBox = new Box<string>();
stringBox.add("First item");
stringBox.add("Second item");
console.log("Get index 0:", stringBox.get(0));
console.log("Get index 5:", stringBox.get(5)); // undefined

// Box of numbers
const numberBox = new Box<number>();
numberBox.add(100);
numberBox.add(200);
numberBox.add(300);
console.log("Number box contents:", numberBox.getAll());

// Box of custom objects
interface Product {
    id: number;
    name: string;
    price: number;
}

const productBox = new Box<Product>();
productBox.add({ id: 1, name: "Laptop", price: 999 });
productBox.add({ id: 2, name: "Mouse", price: 29 });
console.log("Product at index 1:", productBox.get(1));


// ============================================
// Exercise 5: Combining Generic Classes with Constraints
// ============================================

// Interface Item<T> with a value property
interface Item<T> {
    value: T;
}

// Generic class Queue with constraint that T must have a value property
class Queue<T extends Item<any>> {
    private items: T[] = [];

    // Add an item to the queue
    add(item: T): void {
        this.items.push(item);
        console.log(`Queued item with value: ${item.value}`);
    }

    // Remove and return the first item from the queue
    remove(): T | undefined {
        if (this.items.length === 0) {
            console.log("Queue is empty!");
            return undefined;
        }
        const removed = this.items.shift();
        console.log(`Removed item with value: ${removed?.value}`);
        return removed;
    }

    // Peek at the first item without removing
    peek(): T | undefined {
        return this.items[0];
    }

    // Get queue size
    size(): number {
        return this.items.length;
    }
}

// Test Exercise 5
console.log("\n=== Exercise 5: Generic Classes with Constraints ===");

// Queue of number items
const numberQueue = new Queue<{ value: number; priority?: string }>();
numberQueue.add({ value: 10, priority: "high" });
numberQueue.add({ value: 20 });
numberQueue.add({ value: 30 });
console.log("Queue size:", numberQueue.size());
numberQueue.remove(); // Removes 10
console.log("Queue size after remove:", numberQueue.size());

// Queue of string items
const stringQueue = new Queue<{ value: string; category?: string }>();
stringQueue.add({ value: "Task 1", category: "urgent" });
stringQueue.add({ value: "Task 2" });
stringQueue.remove();

// Queue with complex objects
interface TaskItem {
    value: {
        title: string;
        completed: boolean;
    };
    dueDate?: Date;
}

const taskQueue = new Queue<TaskItem>();
taskQueue.add({
    value: { title: "Complete TypeScript exercises", completed: false },
    dueDate: new Date("2026-02-15")
});
taskQueue.add({
    value: { title: "Review code", completed: false }
});
console.log("Current task:", taskQueue.peek()?.value.title);


// ============================================
// 🎉 All Exercises Complete!
// ============================================

console.log("\n✅ All 5 exercises completed successfully!");
console.log("Key concepts covered:");
console.log("  • Intersection Types (&)");
console.log("  • Type Guards (in operator)");
console.log("  • Type Casting with Generics");
console.log("  • Type Assertions (as keyword)");
console.log("  • Generic Constraints (extends)");
console.log("  • Generic Interfaces & Classes");