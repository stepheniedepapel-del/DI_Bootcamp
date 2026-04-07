// --- Exercise 1 : Dog age to Human years ---
const data = [
  { name: 'Butters', age: 3, type: 'dog' },
  { name: 'Cuty', age: 5, type: 'rabbit' },
  { name: 'Lizzy', age: 6, type: 'dog' },
  { name: 'Red', age: 1, type: 'cat' },
  { name: 'Joey', age: 3, type: 'dog' },
  { name: 'Rex', age: 10, type: 'dog' },
];

// 1. Using a loop
let loopSum = 0;
for (let animal of data) {
    if (animal.type === 'dog') {
        loopSum += animal.age * 7;
    }
}
console.log("Sum via loop:", loopSum); // 154

// 2. Using reduce()
const reduceSum = data.reduce((acc, animal) => {
    return animal.type === 'dog' ? acc + (animal.age * 7) : acc;
}, 0);
console.log("Sum via reduce:", reduceSum); // 154


// --- Exercise 2 : Email ---
const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';
const cleanEmail = userEmail3.trim(); 
console.log("Clean email:", cleanEmail);


// --- Exercise 3 : Employees #3 ---
const users = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

// Transforming the array into an object { Full Name: Role }
const userObject = {};
users.forEach(user => {
    userObject[`${user.firstName} ${user.lastName}`] = user.role;
});
console.log("Mapped Users:", userObject);


// --- Exercise 4 : Array to Object ---
const letters = ['x', 'y', 'z', 'z'];

// 1. Using a for loop
const countObjLoop = {};
for (let char of letters) {
    countObjLoop[char] = (countObjLoop[char] || 0) + 1;
}
console.log("Count via loop:", countObjLoop);

// 2. Using reduce()
const countObjReduce = letters.reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
}, {});
console.log("Count via reduce:", countObjReduce);