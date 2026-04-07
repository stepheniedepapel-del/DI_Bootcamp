// --- Exercise 1 : Analyzing the map method ---
// Output: [2, 4, 6]
// Reason: Every element is a number, so they are all multiplied by 2.
const ex1 = [1, 2, 3].map(num => {
  if (typeof num === 'number') return num * 2;
  return;
});


// --- Exercise 2: Analyzing the reduce method ---
// Output: [1, 2, 0, 1, 2, 3]
// Reason: The initial value [1, 2] is concatenated with [0, 1], then with [2, 3].
const ex2 = [[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);


// --- Exercise 3 : Analyze this code ---
// Question: What is the value of i?
// Answer: i represents the index of the current element (0, 1, 2, 3, 4, 5).
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
    // console.log(num, i);
    // alert(num);
    return num * 2;
});


// --- Exercise 4 : Nested arrays ---

// 1. Modify nested numbers to [1, 2, 3, [4], [5]]
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
const flattenedArray = array.flat(2); // Bonus one-line solution

// 2. Modify greeting array to ["Hello young grasshopper!", "you are", "learning fast!"]
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const modifiedGreeting = greeting.map(phrase => phrase.join(" "));

// 3. Turn greeting into a string
const stringGreeting = modifiedGreeting.join(" ");

// 4. Turn the trapped number 3 into [3]
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const freed = trapped.flat(Infinity);


// --- Console Logs for Verification ---
console.log("Ex 1 Result:", ex1);
console.log("Ex 2 Result:", ex2);
console.log("Ex 4.1 (Flattened):", flattenedArray);
console.log("Ex 4.2 (Greeting Array):", modifiedGreeting);
console.log("Ex 4.3 (Greeting String):", stringGreeting);
console.log("Ex 4.4 (Trapped Number):", freed);