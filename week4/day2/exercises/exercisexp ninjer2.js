// --- Exercise 1 : Menu ---
const menu = [
  { type : "starter", name : "Houmous with Pita" },
  { type : "starter", name : "Vegetable Soup with Houmous peas" },
  { type : "dessert", name : "Chocolate Cake" }
];

// 1. Check if at least one dessert exists (using ternary)
const hasDessert = menu.some(item => item.type === "dessert") ? "Yes" : "No";
console.log("Is there a dessert?", hasDessert);

// 2. Check if all elements are starters
const allStarters = menu.every(item => item.type === "starter");
console.log("Are all starters?", allStarters);

// 3. Check for main course; if not, add one
if (!menu.some(item => item.type === "main course")) {
    menu.push({ type: "main course", name: "Steak and Fries" });
}

// 4. Add "vegetarian" key based on the vegetarian array
const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];

menu.forEach(item => {
    // Check if the name (lowercased) contains any of the vegetarian words
    item.vegetarian = vegetarian.some(vegItem => 
        item.name.toLowerCase().includes(vegItem)
    );
});
console.log("Updated Menu:", menu);


// --- Exercise 2 : Chop into chunks ---
const string_chop = (str, size) => {
    if (!size || size <= 0) return [str];
    const chunks = [];
    for (let i = 0; i < str.length; i += size) {
        chunks.push(str.slice(i, i + size));
    }
    return chunks;
};

console.log(string_chop('developers', 2)); // ["de", "ve", "lo", "pe", "rs"]


// --- Exercise 3 : You said string ? ---
const search_word = (str, word) => {
    // Split the string into an array of words and filter for matches
    const count = str.split(' ').filter(w => w === word).length;
    return `'${word}' was found ${count} times.`;
};

console.log(search_word('The quick brown fox', 'fox')); 


// --- Exercise 4 : Reverse Array ---
// Constraint: Do it without creating a new array (In-place reversal)
const reverseArray = (arr) => {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Swap elements using destructuring assignment
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;
};

console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
console.log(reverseArray([1, 2]));          // [2, 1]