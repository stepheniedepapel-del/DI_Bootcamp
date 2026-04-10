function makeAllCaps(wordsArray) {
  return new Promise((resolve, reject) => {
    // Check if all elements are strings
    const allStrings = wordsArray.every(word => typeof word === 'string');
    
    if (allStrings) {
      // Resolve with uppercase array
      resolve(wordsArray.map(word => word.toUpperCase()));
    } else {
      // Reject if any element is not a string
      reject('Error: Array contains non-string values');
    }
  });
}

function sortWords(uppercasedArray) {
  return new Promise((resolve, reject) => {
    if (uppercasedArray.length > 4) {
      // Resolve with sorted array
      resolve(uppercasedArray.sort());
    } else {
      // Reject if array has 4 or fewer items
      reject('Error: Array length must be greater than 4');
    }
  });
}

// Test Case 1: Contains number - should catch error
console.log("Test 1: [1, 'pear', 'banana']");
makeAllCaps([1, "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.log(error));

// Test Case 2: Only 3 words - should catch error (length <= 4)
console.log("\nTest 2: ['apple', 'pear', 'banana']");
makeAllCaps(["apple", "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.log(error));

// Test Case 3: 5 words - should succeed
console.log("\nTest 3: ['apple', 'pear', 'banana', 'melon', 'kiwi']");
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result)) // ["APPLE","BANANA", "KIWI", "MELON", "PEAR"]
  .catch(error => console.log(error));