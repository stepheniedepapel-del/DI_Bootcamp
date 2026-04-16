// ============================================
// Exercise 1: TypeScript Generics and Intersection Types
// ============================================

// Define base types that we'll combine using intersection
type Identifiable = {
    id: number;
};

type Timestamped = {
    createdAt: Date;
    updatedAt: Date;
};

type Auditable = {
    createdBy: string;
    updatedBy: string;
};

// Combine multiple types using intersection
type FullEntity = Identifiable & Timestamped & Auditable;

// Generic Container class that works with intersection types
class Container<T extends Identifiable> {
    private items: T[] = [];

    // Add an item to the container
    add(item: T): void {
        this.items.push(item);
        console.log(`✅ Added item with ID: ${item.id}`);
    }

    // Remove an item by ID
    remove(id: number): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            const removed = this.items.splice(index, 1)[0];
            console.log(`❌ Removed item with ID: ${removed.id}`);
            return true;
        }
        console.log(`⚠️ Item with ID ${id} not found`);
        return false;
    }

    // Get an item by ID
    getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    // List all items
    listAll(): T[] {
        console.log(`📋 Listing all ${this.items.length} items:`);
        return [...this.items];
    }

    // Get count of items
    count(): number {
        return this.items.length;
    }

    // Find items by predicate
    find(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }
}

// Test Exercise 1
console.log("=== Exercise 1: Generics and Intersection Types ===\n");

// Define a concrete type using intersection
type Product = Identifiable & Timestamped & Auditable & {
    name: string;
    price: number;
    category: string;
};

// Create container for products
const productContainer = new Container<Product>();

// Add products
productContainer.add({
    id: 1,
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-20"),
    createdBy: "admin",
    updatedBy: "admin"
});

productContainer.add({
    id: 2,
    name: "Coffee Mug",
    price: 12.50,
    category: "Kitchen",
    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-02-01"),
    createdBy: "user123",
    updatedBy: "user123"
});

productContainer.add({
    id: 3,
    name: "Wireless Mouse",
    price: 29.99,
    category: "Electronics",
    createdAt: new Date("2026-03-10"),
    updatedAt: new Date("2026-03-12"),
    createdBy: "admin",
    updatedBy: "manager"
});

// List all
console.log("\nAll products:", productContainer.listAll());

// Find by ID
const product = productContainer.getById(2);
console.log("\nFound product:", product);

// Find by predicate (electronics only)
const electronics = productContainer.find(p => p.category === "Electronics");
console.log("\nElectronics only:", electronics);

// Remove item
productContainer.remove(2);
console.log("\nCount after removal:", productContainer.count());


// ============================================
// Exercise 2: Generic Interfaces and Type Casting
// ============================================

// Generic interface for API responses
interface Response<T> {
    success: boolean;
    data: T;
    message: string;
    statusCode: number;
    timestamp: string;
}

// Different data types for responses
interface UserData {
    id: number;
    username: string;
    email: string;
    role: string;
}

interface ProductData {
    sku: string;
    name: string;
    price: number;
    inStock: boolean;
}

interface OrderData {
    orderId: string;
    items: string[];
    total: number;
    status: "pending" | "shipped" | "delivered";
}

// Function that parses and casts response data
function parseResponse<T>(response: any, typeGuard?: (data: any) => data is T): Response<T> {
    // Type casting: ensure the response matches our interface
    const typedResponse = response as Response<T>;
    
    // Validate basic structure
    if (!typedResponse || typeof typedResponse.success !== 'boolean') {
        throw new Error("Invalid response structure");
    }
    
    // If type guard provided, validate data type
    if (typeGuard && !typeGuard(typedResponse.data)) {
        throw new Error("Data type mismatch");
    }
    
    console.log(`✅ Parsed response: ${typedResponse.message} (Status: ${typedResponse.statusCode})`);
    return typedResponse;
}

// Type guard functions for runtime type checking
function isUserData(data: any): data is UserData {
    return data && 
           typeof data.id === 'number' && 
           typeof data.username === 'string' && 
           typeof data.email === 'string';
}

function isProductData(data: any): data is ProductData {
    return data && 
           typeof data.sku === 'string' && 
           typeof data.name === 'string' && 
           typeof data.price === 'number';
}

// Test Exercise 2
console.log("\n=== Exercise 2: Generic Interfaces and Type Casting ===\n");

// Mock API responses (simulating JSON from server)
const rawUserResponse = {
    success: true,
    data: {
        id: 101,
        username: "johndoe",
        email: "john@example.com",
        role: "admin"
    },
    message: "User retrieved successfully",
    statusCode: 200,
    timestamp: "2026-04-16T12:00:00Z"
};

const rawProductResponse = {
    success: true,
    data: {
        sku: "LAPTOP-001",
        name: "Pro Laptop X1",
        price: 1499.99,
        inStock: true
    },
    message: "Product found",
    statusCode: 200,
    timestamp: "2026-04-16T12:05:00Z"
};

// Parse with type casting
const userResponse = parseResponse<UserData>(rawUserResponse, isUserData);
console.log("User:", userResponse.data.username, `(${userResponse.data.email})`);

const productResponse = parseResponse<ProductData>(rawProductResponse, isProductData);
console.log("Product:", productResponse.data.name, `- $${productResponse.data.price}`);

// Demonstrate type casting with array response
const rawListResponse = {
    success: true,
    data: [
        { orderId: "ORD-001", items: ["item1", "item2"], total: 50.00, status: "shipped" },
        { orderId: "ORD-002", items: ["item3"], total: 25.00, status: "pending" }
    ],
    message: "Orders retrieved",
    statusCode: 200,
    timestamp: "2026-04-16T12:10:00Z"
};

const ordersResponse = parseResponse<OrderData[]>(rawListResponse);
console.log("Orders count:", ordersResponse.data.length);


// ============================================
// Exercise 3: Generic Classes and Type Assertions
// ============================================

// Generic Repository class with type assertions
class Repository<T extends { id: string | number }> {
    private items: Map<string | number, T> = new Map();
    private history: { action: string; itemId: string | number; timestamp: Date }[] = [];

    // Add item with type assertion ensuring ID exists
    add(item: T): void {
        const id = item.id;
        this.items.set(id, item);
        this.logAction("ADD", id);
        console.log(`💾 Repository: Added item ${id}`);
    }

    // Retrieve item with type assertion for safety
    get(id: string | number): T {
        const item = this.items.get(id);
        
        // Type assertion: we know this should exist or we throw
        if (!item) {
            throw new Error(`Item with ID ${id} not found in repository`);
        }
        
        // Type assertion to ensure TypeScript knows this is T
        return item as T;
    }

    // Safe retrieve that returns undefined if not found
    findById(id: string | number): T | undefined {
        return this.items.get(id) as T | undefined;
    }

    // Update item with type assertion
    update(id: string | number, updates: Partial<T>): T {
        const existing = this.findById(id);
        if (!existing) {
            throw new Error(`Cannot update: Item ${id} not found`);
        }
        
        // Merge and assert type
        const updated = { ...existing, ...updates } as T;
        this.items.set(id, updated);
        this.logAction("UPDATE", id);
        console.log(`📝 Repository: Updated item ${id}`);
        
        return updated;
    }

    // Delete with type assertion on return
    delete(id: string | number): T | undefined {
        const item = this.findById(id);
        if (item) {
            this.items.delete(id);
            this.logAction("DELETE", id);
            console.log(`🗑️ Repository: Deleted item ${id}`);
        }
        return item as T | undefined;
    }

    // List all with type assertion
    listAll(): T[] {
        // Convert iterator to array with type assertion
        return Array.from(this.items.values()) as T[];
    }

    // Search with type assertions in predicate
    search(predicate: (item: T) => boolean): T[] {
        return this.listAll().filter(predicate);
    }

    // Private helper for logging
    private logAction(action: string, itemId: string | number): void {
        this.history.push({
            action,
            itemId,
            timestamp: new Date()
        });
    }

    // Get history
    getHistory() {
        return [...this.history];
    }
}

// Test Exercise 3
console.log("\n=== Exercise 3: Generic Classes and Type Assertions ===\n");

// Define entity types
interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    department: string;
    salary: number;
}

interface Project {
    id: number;
    name: string;
    budget: number;
    deadline: Date;
    assignedEmployees: string[];
}

// Create repositories
const employeeRepo = new Repository<Employee>();
const projectRepo = new Repository<Project>();

// Add employees
employeeRepo.add({
    id: "EMP-001",
    firstName: "Alice",
    lastName: "Johnson",
    department: "Engineering",
    salary: 85000
});

employeeRepo.add({
    id: "EMP-002",
    firstName: "Bob",
    lastName: "Smith",
    department: "Marketing",
    salary: 65000
});

employeeRepo.add({
    id: "EMP-003",
    firstName: "Carol",
    lastName: "Davis",
    department: "Engineering",
    salary: 92000
});

// Add projects
projectRepo.add({
    id: 1001,
    name: "Website Redesign",
    budget: 50000,
    deadline: new Date("2026-06-01"),
    assignedEmployees: ["EMP-001", "EMP-002"]
});

projectRepo.add({
    id: 1002,
    name: "Mobile App",
    budget: 120000,
    deadline: new Date("2026-08-15"),
    assignedEmployees: ["EMP-001", "EMP-003"]
});

// Retrieve with type assertion (get throws if not found)
console.log("\n--- Retrieving Items ---");
const emp1 = employeeRepo.get("EMP-001");
console.log(`Employee: ${emp1.firstName} ${emp1.lastName} (${emp1.department})`);

const proj1 = projectRepo.get(1001);
console.log(`Project: ${proj1.name} - Budget: $${proj1.budget}`);

// Safe find (returns undefined if not found)
const notFound = employeeRepo.findById("EMP-999");
console.log("Find non-existent:", notFound === undefined ? "Not found (as expected)" : "Found");

// Update with type assertion
console.log("\n--- Updating Items ---");
const updatedEmp = employeeRepo.update("EMP-002", { salary: 70000, department: "Sales" });
console.log(`Updated ${updatedEmp.firstName}'s salary to $${updatedEmp.salary}, dept to ${updatedEmp.department}`);

// Search functionality
console.log("\n--- Searching ---");
const engineers = employeeRepo.search(e => e.department === "Engineering");
console.log("Engineering employees:", engineers.map(e => `${e.firstName} ${e.lastName}`));

const highBudgetProjects = projectRepo.search(p => p.budget > 60000);
console.log("High budget projects:", highBudgetProjects.map(p => p.name));

// List all
console.log("\n--- Listing All ---");
console.log("All employees:", employeeRepo.listAll().length);
console.log("All projects:", projectRepo.listAll().length);

// Delete
console.log("\n--- Deleting ---");
const deleted = employeeRepo.delete("EMP-002");
console.log(`Deleted: ${deleted?.firstName || 'N/A'}`);

// Show history
console.log("\n--- Repository History ---");
console.log("Employee repo actions:", employeeRepo.getHistory().length);
console.log("Project repo actions:", projectRepo.getHistory().length);


// ============================================
// 🎉 Expert Exercises Complete!
// ============================================

console.log("\n" + "=".repeat(50));
console.log("✅ All 3 Expert Exercises Completed Successfully!");
console.log("=".repeat(50));
console.log("\nKey Expert Concepts Mastered:");
console.log("  🔹 Generics + Intersection Types (Exercise 1)");
console.log("  🔹 Generic Interfaces + Type Casting (Exercise 2)");
console.log("  🔹 Generic Classes + Type Assertions (Exercise 3)");
console.log("  🔹 Type Guards for Runtime Safety");
console.log("  🔹 Generic Constraints (extends)");
console.log("  🔹 Flexible, Reusable, Type-Safe Code");
export{};