const gameInfo = [
 {
   username: "john",
   team: "red",
   score: 5,
   items: ["ball", "book", "pen"]
 },
 {
   username: "becky",
   team: "blue",
   score: 10,
   items: ["tape", "backpack", "pen"]
 },
 {
   username: "susy",
   team: "red",
   score: 55,
   items: ["ball", "eraser", "pen"]
 },
 {
   username: "tyson",
   team: "green",
   score: 1,
   items: ["book", "pen"]
 },
];

// 1. Create an array of usernames with "!" using forEach
const usernames = [];
gameInfo.forEach((player) => {
    usernames.push(`${player.username}!`);
});

console.log("Usernames:", usernames);
// Output: ["john!", "becky!", "susy!", "tyson!"]


// 2. Create an array of usernames with a score bigger than 5
const winners = [];
gameInfo.forEach((player) => {
    if (player.score > 5) {
        winners.push(player.username);
    }
});

console.log("Winners:", winners);
// Output: ["becky", "susy"]


// 3. Find and display the total score using reduce
const totalScore = gameInfo.reduce((accumulator, player) => {
    return accumulator + player.score;
}, 0);

console.log("Total Score:", totalScore); 
// Output: 71