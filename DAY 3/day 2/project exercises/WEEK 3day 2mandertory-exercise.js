// ==================== EXERCISE 1 ====================
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let numbers = [];
    
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            numbers.push(i);
            sum += i;
        }
    }
    
    console.log("Divisor:", divisor);
    console.log("Numbers:", numbers.join(" "));
    console.log("Sum:", sum);
    console.log("");
}

console.log("=== EXERCISE 1 ===");
displayNumbersDivisible(23);
displayNumbersDivisible(3);
displayNumbersDivisible(45);

// ==================== EXERCISE 2 ====================
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry": 1
};  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry": 10
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let total = 0;
    
    for (let item of shoppingList) {
        if (item in stock && stock[item] > 0) {
            total += prices[item];
            stock[item]--;
        }
    }
    
    return total;
}

console.log("=== EXERCISE 2 ===");
console.log("Total:", myBill());
console.log("");

// ==================== EXERCISE 3 ====================
function changeEnough(itemPrice, amountOfChange) {
    const values = [0.25, 0.10, 0.05, 0.01];
    let totalChange = 0;
    
    for (let i = 0; i < amountOfChange.length; i++) {
        totalChange += amountOfChange[i] * values[i];
    }
    
    return totalChange >= itemPrice;
}

console.log("=== EXERCISE 3 ===");
console.log("changeEnough(4.25, [25, 20, 5, 0]):", changeEnough(4.25, [25, 20, 5, 0]));
console.log("changeEnough(14.11, [2, 100, 0, 0]):", changeEnough(14.11, [2, 100, 0, 0]));
console.log("changeEnough(0.75, [0, 0, 20, 5]):", changeEnough(0.75, [0, 0, 20, 5]));
console.log("");

// ==================== EXERCISE 4 ====================
function hotelCost(nights) {
    return nights * 140;
}

function planeRideCost(destination) {
    if (destination === "London") return 183;
    if (destination === "Paris") return 220;
    return 300;
}

function rentalCarCost(days) {
    let cost = days * 40;
    if (days > 10) cost *= 0.95;
    return cost;
}

function totalVacationCost(nights, destination, days) {
    const hotel = hotelCost(nights);
    const plane = planeRideCost(destination);
    const car = rentalCarCost(days);
    
    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}`);
    return hotel + plane + car;
}

console.log("=== EXERCISE 4 ===");
const totalCost = totalVacationCost(5, "Paris", 12);
console.log("Total:", totalCost);
console.log("");

// ==================== EXERCISE 5, 6, 7 ====================
console.log("=== EXERCISES 5, 6, 7 ===");
console.log("These exercises require DOM manipulation.");
console.log("Please open the HTML file in a browser to see them working.");
console.log("Or check the browser console for Exercise 5 logs.");