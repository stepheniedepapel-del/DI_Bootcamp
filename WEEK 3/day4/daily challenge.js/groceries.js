// Initial data
let client = "John";

const groceries = {
    fruits: ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice: "20$",
    other: {
        paid: true,
        meansOfPayment: ["cash", "creditCard"]
    }
};

// ==========================================
// displayGroceries function
// ==========================================
const displayGroceries = () => {
    groceries.fruits.forEach(fruit => {
        console.log(fruit);
    });
};

// Test displayGroceries
console.log("=== Fruits ===");
displayGroceries(); 
// Output: pear, apple, banana (each on new line)


// ==========================================
// cloneGroceries function
// ==========================================
const cloneGroceries = () => {
    
    // 1. Copy of client variable (PRIMITIVE - Pass by Value)
    let user = client;
    console.log("\n=== Step 1: Copy client to user ===");
    console.log("client:", client);  // "John"
    console.log("user:", user);      // "John"
    
    // Change client
    client = "Betty";
    console.log("\n=== Step 2: Change client to 'Betty' ===");
    console.log("client:", client);  // "Betty"
    console.log("user:", user);       // "John" 
    
    // QUESTION: Will user also change to "Betty"?
    // ANSWER: NO! 
    // EXPLANATION: Strings are PRIMITIVE types (passed by VALUE).
    // When we did `let user = client`, we COPIED the value "John".
    // They are now independent. Changing client doesn't affect user.
    
    
    // 2. Copy of groceries variable (OBJECT - Pass by Reference)
    let shopping = groceries;
    console.log("\n=== Step 3: Assign groceries to shopping ===");
    console.log("groceries.totalPrice:", groceries.totalPrice);  // "20$"
    console.log("shopping.totalPrice:", shopping.totalPrice);      // "20$"
    
    // Change totalPrice
    shopping.totalPrice = "35$";
    console.log("\n=== Step 4: Change shopping.totalPrice to '35$' ===");
    console.log("groceries.totalPrice:", groceries.totalPrice);  // "35$" 
    console.log("shopping.totalPrice:", shopping.totalPrice);      // "35$"
    
    // QUESTION: Will groceries.totalPrice also change?
    // ANSWER: YES!
    // EXPLANATION: Objects are passed by REFERENCE. 
    // `shopping = groceries` means shopping points to SAME memory location.
    // They are the SAME object with two different names.
    
    
    // 3. Change nested property
    shopping.other.paid = false;
    console.log("\n=== Step 5: Change shopping.other.paid to false ===");
    console.log("groceries.other.paid:", groceries.other.paid);  // false
    console.log("shopping.other.paid:", shopping.other.paid);      // false
    
    // QUESTION: Will groceries.other.paid also change?
    // ANSWER: YES!
    // EXPLANATION: Nested objects are ALSO passed by reference.
    // Since shopping and groceries point to same object, 
    // shopping.other IS groceries.other (same reference).
};

// Invoke the function
cloneGroceries();

// Final verification
console.log("\n=== Final Verification ===");
console.log("client:", client);           // "Betty"
console.log("groceries.totalPrice:", groceries.totalPrice);  // "35$"
console.log("groceries.other.paid:", groceries.other.paid);  // false