// Base class Employee
class Employee {
    protected name: string;
    protected salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    getDetails(): string {
        return `Name: ${this.name}, Salary: ${this.salary}`;
    }
}

// Derived class Manager
class Manager extends Employee {
    public department: string;

    constructor(name: string, salary: number, department: string) {
        super(name, salary); // Call parent constructor
        this.department = department;
    }

    // Override getDetails to include department
    getDetails(): string {
        return `${super.getDetails()}, Department: ${this.department}`;
    }
}

// Create instance and test
const manager = new Manager("Alice Johnson", 75000, "Engineering");
console.log(manager.getDetails());
// Output: Name: Alice Johnson, Salary: 75000, Department: Engineering