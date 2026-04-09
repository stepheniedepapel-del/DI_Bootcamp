function isBlank(str) {
    return str === '' || str.trim() === '';
}

// Tests
console.log(isBlank(''));      // true
console.log(isBlank('abc'));   // false

exer2cise 2
function abbrevName(name) {
    const parts = name.split(' ');
    return parts[0] + ' ' + parts[1][0] + '.';
}

// Test
console.log(abbrevName("Robin Singh"));  // "Robin S."
exercise3
function swapCase(str) {
    let result = '';
    for (let char of str) {
        if (char === char.toUpperCase()) {
            result += char.toLowerCase();
        } else {
            result += char.toUpperCase();
        }
    }
    return result;
}

// Test
console.log(swapCase('The Quick Brown Fox'));  // 'tHE qUICK bROWN fOX'
exercise4
function isOmnipresent(arr, value) {
    return arr.every(subArray => subArray.includes(value));
}

// Tests
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1));  // true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6));  // false