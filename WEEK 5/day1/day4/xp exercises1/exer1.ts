// Define the base types
export {};
type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

// Intersection type: combines ALL properties from both
type PersonWithAddress = Person & Address;

// Must supply all 4 properties or TypeScript will error
const user: PersonWithAddress = {
  name: "Alice",
  age: 30,
  street: "123 Main St",
  city: "Nairobi",
};

console.log(user.name, user.city); // Alice  Nairobi