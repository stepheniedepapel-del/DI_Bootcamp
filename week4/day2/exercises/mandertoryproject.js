// 🌟 Exercise 1 : Colors
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

colors.forEach((color, index) => {
    console.log(`${index + 1}# choice is ${color}.`);
});

const hasViolet = colors.some((color) => color === "Violet");
console.log(hasViolet ? "Yeah" : "No...");

// -----------------------------------------------------------

// 🌟 Exercise 2 : Colors #2
const colors2 = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th", "st", "nd", "rd"];

colors2.forEach((color, index) => {
    let i = index + 1;
    let suffix = (i <= 3) ? ordinal[i] : ordinal[0];
    console.log(`${i}${suffix} choice is ${color}.`);
});

// -----------------------------------------------------------

// Exercise 3 : Analyzing (Results in comments)
// 1. ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange']
// 2. ["U", "S", "A"]
// 3. [undefined, undefined]

// -----------------------------------------------------------

// 🌟 Exercise 4 : Employees
const users = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

const welcomeStudents = users.map(user => `Hello ${user.firstName}`);

const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');

const residentLastNames = users
    .filter(user => user.role === 'Full Stack Resident')
    .map(user => user.lastName);

// -----------------------------------------------------------

// 🌟 Exercise 5 : Star Wars
const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

const sentence = epic.reduce((acc, val) => `${acc} ${val}`);
console.log(sentence);

// -----------------------------------------------------------

// 🌟 Exercise 6 : Employees #2
const students = [
    {name: "Ray", course: "Computer Science", isPassed: true}, 
    {name: "Liam", course: "Computer Science", isPassed: false}, 
    {name: "Jenner", course: "Information Technology", isPassed: true}, 
    {name: "Marco", course: "Robotics", isPassed: true}, 
    {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
    {name: "Jamie", course: "Big Data", isPassed: false}
];

const passedStudents = students.filter(student => student.isPassed);

students
    .filter(student => student.isPassed)
    .forEach(student => {
        console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
    });