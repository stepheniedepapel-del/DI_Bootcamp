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

// Exercise 1: Create array with usernames + "!"
const usernames = [];
gameInfo.forEach(player => {
  usernames.push(player.username + "!");
});
console.log("Exercise 1 - Usernames:", usernames);
// Output: ["john!", "becky!", "susy!", "tyson!"]

// Exercise 2: Create array with usernames of players with score > 5
const winners = [];
gameInfo.forEach(player => {
  if (player.score > 5) {
    winners.push(player.username);
  }
});
console.log("Exercise 2 - Winners:", winners);
// Output: ["becky", "susy"]

// Exercise 3: Calculate total score of all users
let totalScore = 0;
gameInfo.forEach(player => {
  totalScore += player.score;
});
console.log("Exercise 3 - Total Score:", totalScore);
// Output: 71