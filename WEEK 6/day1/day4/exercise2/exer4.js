const { faker } = require('@faker-js/faker');
const readlineSync = require('readline-sync');

const users = [];

function addFakeUser() {
    const user = {
        name: faker.person.fullName(),
        address: {
            street: faker.location.streetAddress(),
            country: faker.location.country()
        }
    };
    users.push(user);
    console.log('Added fake user:', user.name);
    return user;
}

function addRealUser() {
    const name = readlineSync.question('Enter your full name: ');
    const street = readlineSync.question('Enter your street: ');
    const country = readlineSync.question('Enter your country: ');
    const user = { name, address: { street, country } };
    users.push(user);
    return user;
}

// Add 3 fake users
addFakeUser(); addFakeUser(); addFakeUser();

// Bonus: Add real user
console.log('\n--- Add a real user ---');
addRealUser();

// Display all
console.log('\n=== All Users ===');
users.forEach((u, i) => console.log(`${i+1}. ${u.name} | ${u.address.street}, ${u.address.country}`));

module.exports = { users, addFakeUser, addRealUser };