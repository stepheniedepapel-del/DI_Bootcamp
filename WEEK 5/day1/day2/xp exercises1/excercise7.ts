// Exercise 7: Type Assertions

// Get an element from the DOM and cast it
const inputElement = document.getElementById("myInput") as HTMLInputElement;

// Access and manipulate properties
if (inputElement) {
    inputElement.value = "Hello TypeScript!";
    console.log(inputElement.value);
}

// Alternative syntax using angle brackets (not recommended in JSX)
// const inputElement = <HTMLInputElement>document.getElementById("myInput");