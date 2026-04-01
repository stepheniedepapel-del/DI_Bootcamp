/**
 * Daily Challenge: Star Pattern
 * Developers Institute 2026
 */

console.log("=".repeat(50));
console.log("METHOD 1: USING ONE LOOP");
console.log("=".repeat(50));

let pattern1 = "";
for (let i = 1; i <= 6; i++) {
    pattern1 += "* ".repeat(i) + "\n";
}
console.log(pattern1);

console.log("=".repeat(50));
console.log("METHOD 2: USING TWO NESTED FOR LOOPS");
console.log("=".repeat(50));

let pattern2 = "";
for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= i; j++) {
        pattern2 += "* ";
    }
    pattern2 += "\n";
}
console.log(pattern2);