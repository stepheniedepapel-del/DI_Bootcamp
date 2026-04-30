function returnNumbers(str) {
    const numbers = str.match(/\d/g);
    return numbers ? numbers.join('') : '';
}

console.log(returnNumbers('k5k3q2g5z6x9bn')); // 532569
console.log(returnNumbers('abc123'));         // 123

module.exports = returnNumbers;