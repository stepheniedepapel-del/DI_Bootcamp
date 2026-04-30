 const readlineSync = require('readline-sync');

function validateFullName(name) {
    const regex = /^[A-Z][a-zA-Z]+\s[A-Z][a-zA-Z]+$/;
    return regex.test(name);
}

const fullName = readlineSync.question('Enter your full name (e.g., John Doe): ');

if (validateFullName(fullName)) {
    console.log('✅ Valid name!');
} else {
    console.log('❌ Invalid. Must be: letters only, one space, capitalized (John Doe)');
}

module.exports = validateFullName;