// Base class Employee
class Employee {
    public name: string;
    private age: number;
    protected salary: number;

    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    // Protected method - accessible in derived classes, not from outside
    protected calculateBonus(): number {
        return this.salary * 0.1; // 10% bonus
    }

    // Public method to get salary details (can be overridden)
    public getSalaryDetails(): string {
        return `${this.name}'s Base Salary: $${this.salary}`;
    }

    // Public getter for age (since it's private)
    public getAge(): number {
        return this.age;
    }
}

// Manager extends Employee
class Manager extends Employee {
    private department: string;

    constructor(name: string, age: number, salary: number, department: string) {
        super(name, age, salary);
        this.department = department;
    }

    // Override getSalaryDetails to include bonus
    public getSalaryDetails(): string {
        const bonus = this.calculateBonus(); // Access protected method from parent
        const totalSalary = this.salary + bonus;
        return `${this.name}'s Total Salary (Manager): $${totalSalary} (Base: $${this.salary}, Bonus: $${bonus}, Dept: ${this.department})`;
    }

    // Protected method for next level inheritance
    protected getDepartment(): string {
        return this.department;
    }
}

// ExecutiveManager extends Manager
class ExecutiveManager extends Manager {
    private budgetApprovalLimit: number;

    constructor(name: string, age: number, salary: number, department: string, budgetLimit: number) {
        super(name, age, salary, department);
        this.budgetApprovalLimit = budgetLimit;
    }

    // New method specific to ExecutiveManager
    public approveBudget(amount: number): string {
        if (amount <= this.budgetApprovalLimit) {
            return `✅ ${this.name} approved budget of $${amount}`;
        } else {
            return `❌ ${this.name} cannot approve $${amount}. Limit: $${this.budgetApprovalLimit}`;
        }
    }

    // Override to include executive level info
    public getSalaryDetails(): string {
        const bonus = this.calculateBonus() * 2; // Executive gets double bonus!
        const totalSalary = this.salary + bonus;
        return `${this.name}'s Total Salary (Executive): $${totalSalary} (Base: $${this.salary}, Executive Bonus: $${bonus})`;
    }
}

// Test Exercise 1
console.log("=".repeat(60));
console.log("EXERCISE 1: Advanced Access Modifiers and Inheritance");
console.log("=".repeat(60));

const exec = new ExecutiveManager("Sarah Johnson", 45, 150000, "Engineering", 500000);
console.log(exec.getSalaryDetails());
console.log(exec.approveBudget(300000));
console.log(exec.approveBudget(600000));
console.log(`Age (via getter): ${exec.getAge()}`);
// console.log(exec.age); // ❌ Error: Property 'age' is private
// console.log(exec.salary); // ❌ Error: Property 'salary' is protected
// console.log(exec.calculateBonus()); // ❌ Error: Method is protected