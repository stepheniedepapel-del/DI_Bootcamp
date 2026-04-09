// ==========================================
// Exercise 1 : Nested functions
// ==========================================

// PREDICTION BEFORE EXECUTING:
// "____/''''\\____"
// Explanation: 
// - flat(4) adds 4 underscores: "____"
// - mountain(4) adds "/" + 4 apostrophes + "\\" : "/''''\\"
// - flat(4) adds 4 more underscores: "____"
// Result: "____/''''\\____"

// CONVERTED TO NESTED ARROW FUNCTIONS:
const landscape = () => {
    let result = "";

    const flat = (x) => {
        for (let count = 0; count < x; count++) {
            result += "_";
        }
    };

    const mountain = (x) => {
        result += "/";
        for (let counter = 0; counter < x; counter++) {
            result += "'";
        }
        result += "\\";
    };

    flat(4);
    mountain(4);
    flat(4);

    return result;
};

console.log(landscape()); // "____/''''\\____"


// ==========================================
// Exercise 2 : Closure
// ==========================================

// PREDICTION: 13
// Explanation:
// addTo is a curried function: x => y => x + y
// addTo(10) returns a function: y => 10 + y
// addToTen(3) calls that function with y=3: 10 + 3 = 13

const addTo = x => y => x + y;
const addToTen = addTo(10);
console.log(addToTen(3)); // 13


// ==========================================
// Exercise 3 : Currying
// ==========================================

// PREDICTION: 31
// Explanation:
// curriedSum(30) returns a function: (b) => 30 + b
// Then (1) is passed to that function: 30 + 1 = 31

const curriedSum = (a) => (b) => a + b;
console.log(curriedSum(30)(1)); // 31


// ==========================================
// Exercise 4 : Currying
// ==========================================

// PREDICTION: 17
// Explanation:
// curriedSum(5) returns a function: (b) => 5 + b, stored in add5
// add5(12) calls that function: 5 + 12 = 17

const curriedSum2 = (a) => (b) => a + b;
const add5 = curriedSum2(5);
console.log(add5(12)); // 17


// ==========================================
// Exercise 5 : Composing
// ==========================================

// PREDICTION: 16
// Explanation:
// compose(add1, add5) returns a function: (a) => add1(add5(a))
// Execution with a=10:
//   1. g(a) = add5(10) = 15
//   2. f(result) = add1(15) = 16
// compose applies functions RIGHT TO LEFT: add5 first, then add1

const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5 = (num) => num + 5;
console.log(compose(add1, add5)(10)); // 16