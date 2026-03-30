/**
 * Daily Challenge: Not Bad
 * Developers Institute 2026
 */

// Create sentence variable containing "not" and "bad"
let sentence = "The movie is not that bad, I like it";

// Find first appearance of "not"
let wordNot = sentence.indexOf("not");

// Find first appearance of "bad"
let wordBad = sentence.indexOf("bad");

// Check if "bad" comes after "not" and both words exist
if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
    // Replace "not...bad" substring with "good"
    // Extract part before "not" and part after "bad"
    let beforeNot = sentence.slice(0, wordNot);
    let afterBad = sentence.slice(wordBad + 3); // +3 to skip "bad"
    
    // Construct new sentence
    sentence = beforeNot + "good" + afterBad;
    console.log(sentence);
} else {
    // "bad" does not come after "not" or words not found
    console.log(sentence);
}

// Test with other examples
console.log("\n--- Additional Tests ---");

// Test 1: "not...bad" pattern
let test1 = "This dinner is not that bad ! You cook well";
let not1 = test1.indexOf("not");
let bad1 = test1.indexOf("bad");
if (not1 !== -1 && bad1 !== -1 && bad1 > not1) {
    test1 = test1.slice(0, not1) + "good" + test1.slice(bad1 + 3);
}
console.log("Test 1:", test1);

// Test 2: Another "not...bad" pattern
let test2 = "This movie is not so bad !";
let not2 = test2.indexOf("not");
let bad2 = test2.indexOf("bad");
if (not2 !== -1 && bad2 !== -1 && bad2 > not2) {
    test2 = test2.slice(0, not2) + "good" + test2.slice(bad2 + 3);
}
console.log("Test 2:", test2);

// Test 3: "bad" without "not"
let test3 = "This dinner is bad !";
let not3 = test3.indexOf("not");
let bad3 = test3.indexOf("bad");
if (not3 !== -1 && bad3 !== -1 && bad3 > not3) {
    test3 = test3.slice(0, not3) + "good" + test3.slice(bad3 + 3);
} else {
    console.log("Test 3:", test3);
}