// ============================================
// EXERCISES XP NINJA - NODE.JS SOLUTIONS
// ============================================

// --------------------------------------------
// Exercise 1: Random Number
// --------------------------------------------
console.log("=== Exercise 1: Random Number ===");

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function printEvenNumbers() {
    const randomNum = getRandomNumber();
    console.log(`Random number: ${randomNum}`);
    console.log("Even numbers from 0 to random number:");
    
    for (let i = 0; i <= randomNum; i += 2) {
        console.log(i);
    }
}

printEvenNumbers();


// --------------------------------------------
// Exercise 2: Capitalized Letters
// --------------------------------------------
console.log("\n=== Exercise 2: Capitalized Letters ===");

function capitalize(str) {
    let evenCapitalized = '';
    let oddCapitalized = '';
    
    for (let i = 0; i < str.length; i++) {
        // Even indexes capitalized
        if (i % 2 === 0) {
            evenCapitalized += str[i].toUpperCase();
            oddCapitalized += str[i].toLowerCase();
        } else {
            evenCapitalized += str[i].toLowerCase();
            oddCapitalized += str[i].toUpperCase();
        }
    }
    
    return [evenCapitalized, oddCapitalized];
}

console.log(capitalize("abcdef"));  // ['AbCdEf', 'aBcDeF']
console.log(capitalize("javascript"));  // ['JaVaScRiPt', 'jAvAsCrIpT']


// --------------------------------------------
// Exercise 3: Is Palindrome?
// --------------------------------------------
console.log("\n=== Exercise 3: Is Palindrome? ===");

function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleanStr.split('').reverse().join('');
    return cleanStr === reversed;
}

console.log(isPalindrome("madam"));      // true
console.log(isPalindrome("bob"));        // true
console.log(isPalindrome("kayak"));      // true
console.log(isPalindrome("hello"));      // false
console.log(isPalindrome("A man a plan a canal Panama")); // true


// --------------------------------------------
// Exercise 4: Biggest Number
// --------------------------------------------
console.log("\n=== Exercise 4: Biggest Number ===");

function biggestNumberInArray(arrayNumber) {
    if (arrayNumber.length === 0) return 0;
    
    let biggest = -Infinity;
    
    for (let item of arrayNumber) {
        if (typeof item === 'number' && item > biggest) {
            biggest = item;
        }
    }
    
    return biggest === -Infinity ? 0 : biggest;
}

const array1 = [-1, 0, 3, 100, 99, 2, 99];
const array2 = ['a', 3, 4, 2];
const array3 = [];

console.log(biggestNumberInArray(array1));  // 100
console.log(biggestNumberInArray(array2));  // 4
console.log(biggestNumberInArray(array3));  // 0


// --------------------------------------------
// Exercise 5: Unique Elements
// --------------------------------------------
console.log("\n=== Exercise 5: Unique Elements ===");

function getUniqueElements(arr) {
    return [...new Set(arr)];
}

// Alternative solution without Set:
function getUniqueElementsManual(arr) {
    const unique = [];
    for (let item of arr) {
        if (!unique.includes(item)) {
            unique.push(item);
        }
    }
    return unique;
}

const list = [1, 2, 3, 3, 3, 3, 4, 5];
console.log(getUniqueElements(list));        // [1, 2, 3, 4, 5]
console.log(getUniqueElementsManual(list));  // [1, 2, 3, 4, 5]


// --------------------------------------------
// Exercise 6: Calendar (Node.js version)
// --------------------------------------------
console.log("\n=== Exercise 6: Calendar ===");

function createCalendar(year, month) {
    // Adjust month (JavaScript months are 0-indexed)
    const date = new Date(year, month - 1, 1);
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    
    // Get first day of month (0 = Sunday, so we adjust to make Monday = 0)
    let firstDay = date.getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1; // Convert to Monday-first
    
    // Get number of days in month
    const daysInMonth = new Date(year, month, 0).getDate();
    
    const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    
    // Build calendar as formatted string (Node.js friendly - no DOM)
    let calendar = `\n${monthNames[month - 1]} ${year}\n`;
    calendar += weekdays.join('\t') + '\n';
    
    let currentDay = 1;
    let weekRow = '';
    
    // Add empty cells for days before start of month
    for (let i = 0; i < firstDay; i++) {
        weekRow += '.\t';
    }
    
    // Fill in the days
    for (let day = 1; day <= daysInMonth; day++) {
        weekRow += day + '\t';
        
        if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
            // Pad remaining cells if last week
            if (day === daysInMonth) {
                const remaining = 7 - ((firstDay + day) % 7);
                if (remaining < 7) {
                    for (let i = 0; i < remaining; i++) {
                        weekRow += '.\t';
                    }
                }
            }
            calendar += weekRow.trim() + '\n';
            weekRow = '';
        }
    }
    
    return calendar;
}

// Test calendar
console.log(createCalendar(2012, 9));
console.log(createCalendar(2026, 3));


// ============================================
// RUN ALL TESTS
// ============================================
console.log("\n=== All Exercises Completed ===");