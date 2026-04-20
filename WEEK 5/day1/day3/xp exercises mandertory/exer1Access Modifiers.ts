class Employee {
    private name: string;        // Only inside class
    private salary: number;        // Only inside class
    public position: string;      // Anywhere
    protected department: string;   // Class + subclasses
    
    constructor(name: string, salary: number, position: string, department: string) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    
    public getEmployeeInfo(): string {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}