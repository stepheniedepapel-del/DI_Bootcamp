const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = `
--- Node.js Exercise Dashboard ---
1. Exercise 1: Products (CommonJS)
2. Exercise 2: Average Age (ES6)
3. Exercise 3: File Manager (CommonJS)
4. Exercise 4: Todo List (ES6)
5. Exercise 5: Math & Lodash (NPM)
6. Exercise 6: Chalk (NPM)
7. Exercise 7: File Explorer (FS)
0. Exit
Choose an exercise to run: `;

const runExercise = (command) => {
    try {
        const output = execSync(command, { encoding: 'utf-8' });
        console.log("\n--- OUTPUT ---\n" + output);
    } catch (err) {
        console.error("Error running exercise:", err.message);
    }
};

const start = () => {
    rl.question(menu, (choice) => {
        switch(choice) {
            case '1': runExercise('node shop.js'); break;
            case '2': runExercise('node app.js'); break; // Ensure type:module
            case '3': runExercise('node app.js'); break; 
            case '4': runExercise('node todoApp/app.js'); break;
            case '5': runExercise('node math-app/app.js'); break;
            case '6': runExercise('node npm-beginner/app.js'); break;
            case '7': runExercise('node file-explorer/read-directory.js'); break;
            case '0': rl.close(); return;
            default: console.log("Invalid choice.");
        }
        start();
    });
};

start();
