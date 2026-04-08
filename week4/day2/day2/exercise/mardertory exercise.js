const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);
//exercise 2
function displayStudentInfo({first, last}) {
    return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({first: 'Elie', last:'Schoppik'}));
exercise 3
const users = { user1: 18273, user2: 92833, user3: 90315 };

// 1. Convert object to array of arrays
const usersArray = Object.entries(users);

// 2. Multiply ID by 2
const updatedUsers = usersArray.map(([user, id]) => [user, id * 2]);

console.log(updatedUsers);
//exercise 4
class Labrador extends Dog {
  constructor(name, size) {
    super(name); // Required to call the parent constructor
    this.size = size;
  }
};
exercise 5
class Labrador extends Dog {
  constructor(name, size) {
    super(name); // Required to call the parent constructor
    this.size = size;
  }
};