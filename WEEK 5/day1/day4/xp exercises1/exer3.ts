// someValue is typed as 'any' — no intellisense, no safety
const someValue: any = "Hello, TypeScript!";

// Cast to string with the 'as' keyword
const strValue = someValue as string;

// Now TypeScript knows it's a string and allows string methods
console.log(strValue.toUpperCase()); // "HELLO, TYPESCRIPT!"
console.log(strValue.length);        // 18

// Alternative angle-bracket syntax (not usable in .tsx files):
const strValue2 = <string>someValue;