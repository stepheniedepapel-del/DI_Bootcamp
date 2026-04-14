// ============================================
// Daily Challenge: Union Type Validator
// Week 5 Day 1
// ============================================

/**
 * Validates if a value's type matches one of the allowed types
 * @param value - The value to check
 * @param allowedTypes - Array of allowed type names as strings (e.g., "string", "number", "boolean")
 * @returns boolean - true if value's type is in allowedTypes, false otherwise
 */
function validateUnionType(value: any, allowedTypes: string[]): boolean {
    // Get the actual type of the value using typeof operator
    const valueType: string = typeof value;
    
    // Loop through allowed types and check if value's type matches any of them
    for (let i = 0; i < allowedTypes.length; i++) {
        if (valueType === allowedTypes[i]) {
            return true; // Found a match!
        }
    }
    
    // No match found after checking all allowed types
    return false;
}

// ============================================
// DEMONSTRATION: Testing with different variables
// ============================================

// Test variables of different types
const userName: string = "Alice";
const userAge: number = 25;
const isActive: boolean = true;
const userScore: number = 95.5;
const userData: null = null;
const userAddress: undefined = undefined;
const userHobbies: string[] = ["reading", "coding"];
const userProfile: object = { name: "Bob", age: 30 };

// Test Case 1: Validate string OR number (common union type)
console.log("--- Test 1: string | number ---");
console.log(`Is "${userName}" valid?`, validateUnionType(userName, ["string", "number"])); // true
console.log(`Is ${userAge} valid?`, validateUnionType(userAge, ["string", "number"])); // true
console.log(`Is ${isActive} valid?`, validateUnionType(isActive, ["string", "number"])); // false

// Test Case 2: Validate boolean only
console.log("\n--- Test 2: boolean ---");
console.log(`Is ${isActive} valid?`, validateUnionType(isActive, ["boolean"])); // true
console.log(`Is "${userName}" valid?`, validateUnionType(userName, ["boolean"])); // false

// Test Case 3: Validate multiple types (string | number | boolean)
console.log("\n--- Test 3: string | number | boolean ---");
console.log(`Is "${userName}" valid?`, validateUnionType(userName, ["string", "number", "boolean"])); // true
console.log(`Is ${userAge} valid?`, validateUnionType(userAge, ["string", "number", "boolean"])); // true
console.log(`Is ${isActive} valid?`, validateUnionType(isActive, ["string", "number", "boolean"])); // true
console.log(`Is null valid?`, validateUnionType(userData, ["string", "number", "boolean"])); // false

// Test Case 4: Validate object types
console.log("\n--- Test 4: object ---");
console.log(`Is userProfile valid?`, validateUnionType(userProfile, ["object"])); // true
console.log(`Is userHobbies valid?`, validateUnionType(userHobbies, ["object"])); // true (arrays are objects in JS)

// Test Case 5: Edge cases
console.log("\n--- Test 5: Edge Cases ---");
console.log(`Is null valid for "object"?`, validateUnionType(null, ["object"])); // true (typeof null is 'object' in JS!)
console.log(`Is undefined valid?`, validateUnionType(undefined, ["undefined"])); // true

// ============================================
// BONUS: Practical Usage Example
// ============================================

/**
 * Process a value only if it's a valid type
 */
function processValue(value: any): void {
    // Only accept strings or numbers
    const isValid = validateUnionType(value, ["string", "number"]);
    
    if (isValid) {
        console.log(`✅ Processing valid value: ${value} (type: ${typeof value})`);
    } else {
        console.log(`❌ Rejected invalid value: ${value} (type: ${typeof value})`);
    }
}

console.log("\n--- Practical Usage Example ---");
processValue("Hello");      // ✅ Valid
processValue(42);           // ✅ Valid
processValue(true);         // ❌ Invalid
processValue([1, 2, 3]);    // ❌ Invalid