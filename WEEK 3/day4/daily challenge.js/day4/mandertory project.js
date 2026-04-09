/* 🌟 EXERCISE 1: SCOPE ANALYSIS */
// #1: Result is 3. Reassignment happens because 'a' is a 'let' variable.
// #1.2: 'const' would throw a TypeError; constants cannot be reassigned.

// #2: Result is 0, then 5. funcTwo modifies the global 'a'.
// #2.2: 'const' would throw a TypeError because you can't change the global constant.

// #3: Result is "hello". window.a creates a global variable.

// #4: Result is "test". Local 'a' inside funcSix shadows the global 'a'.
// #4.2: 'const' works the same way here due to block scoping.

// #5: Result is 5 (inside block), then 2 (outside block). 'let' is block-scoped.
// #5.2: 'const' behaves the same; the inner 'a' is separate from the outer 'a'.


/* 🌟 EXERCISE 2: TERNARY OPERATOR */
const winBattle = () => true;
let experiencePoints = winBattle() ? 10 : 1;
console.log(`Experience Points: ${experiencePoints}`);


/* 🌟 EXERCISE 3: IS IT A STRING? */
const isString = (val) => typeof val === 'string';
console.log("Is 'hello' a string?", isString('hello')); 
console.log("Is array a string?", isString([1, 2, 4, 0]));


/* 🌟 EXERCISE 4: FIND THE SUM */
const sum = (a, b) => a + b;


/* 🌟 EXERCISE 5: KG AND GRAMS */
// 1. Declaration (Hoisted)
function convertToGrams(kg) { return kg * 1000; }
// 2. Expression (Not hoisted)
const kgToGrams = function(kg) { return kg * 1000; };
// Difference: Declarations are hoisted to the top of the scope; expressions are only available after the line they are defined.
// 3. Arrow
const arrowKgToGrams = kg => kg * 1000;


/* 🌟 EXERCISE 6: FORTUNE TELLER (Self-Invoking) */
(function(numChildren, partner, loc, job) {
    const message = `You will be a ${job} in ${loc}, and married to ${partner} with ${numChildren} kids.`;
    const container = document.createElement("p");
    container.textContent = message;
    document.body.appendChild(container);
})(2, "Alex", "Paris", "Architect");


/* 🌟 EXERCISE 7: WELCOME (Self-Invoking) */
(function(user) {
    const nav = document.querySelector(".navbar") || document.body; // Fallback to body if no nav
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `<span>${user}</span> <img src="https://picsum.photos/30" style="border-radius:50%">`;
    nav.appendChild(userDiv);
})("John");


/* 🌟 EXERCISE 8: JUICE BAR (Nested Functions & Closures) */
function makeJuice(size) {
    const ingredients = [];

    function addIngredients(i1, i2, i3) {
        ingredients.push(i1, i2, i3);
    }

    function displayJuice() {
        const text = `The client wants a ${size} juice, containing ${ingredients.join(", ")}.`;
        const p = document.createElement("p");
        p.textContent = text;
        document.body.appendChild(p);
    }

    addIngredients("Apple", "Ginger", "Lemon");
    addIngredients("Carrot", "Kale", "Orange");
    displayJuice();
}

makeJuice("large");