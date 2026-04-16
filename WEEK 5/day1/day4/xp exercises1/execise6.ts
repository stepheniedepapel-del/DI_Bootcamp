type Person = { name: string; age: number };
type Job    = { position: string; department: string };
type Employee = Person & Job;

type Manager   = Employee & { reports: number };
type Developer = Employee & { language: string };

function describeEmployee(emp: Manager | Developer): string {
  // 'in' operator checks for a unique property to narrow the type
  if ("reports" in emp) {
    return `${emp.name} is a Manager with ${emp.reports} direct reports.`;
  }
  return `${emp.name} is a Developer who codes in ${emp.language}.`;
}

const mgr: Manager   = { name:"Sam", age:40, position:"Lead", department:"Eng", reports:5 };
const dev: Developer = { name:"Nia", age:28, position:"SWE",  department:"Eng", language:"TypeScript" };

console.log(describeEmployee(mgr)); // Sam is a Manager with 5 direct reports.
console.log(describeEmployee(dev)); // Nia is a Developer who codes in TypeScript.