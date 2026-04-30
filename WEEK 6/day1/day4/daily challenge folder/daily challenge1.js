// ============================================================
// DAILY CHALLENGE - COMPLETE SOLUTION IN ONE FILE
// Task 1: Basic Module | Task 2: NPM (chalk) | Task 3: File Ops
// ============================================================

const fs = require('fs');
const path = require('path');

// ============================================================
// TASK 1: Basic Module System
// ============================================================

function greet(name) {
    return `Hello, ${name}! Welcome to the Daily Challenge! 🎉`;
}

// ============================================================
// TASK 2: Colorful Message (simulated chalk with ANSI colors)
// ============================================================

const colors = {
    blue: (text) => `\x1b[44m\x1b[37m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    bold: (text) => `\x1b[1m${text}\x1b[0m`
};

function displayColorfulMessage() {
    console.log(colors.blue(' This is a colorful message! '));
    console.log(colors.green('Node.js is awesome!'));
    console.log(colors.red('Colors make it pretty!'));
}

// ============================================================
// TASK 3: File Operations
// ============================================================

function createAndReadFile() {
    // Create the files directory and file-data.txt if they don't exist
    const dirPath = path.join(__dirname, 'files');
    const filePath = path.join(dirPath, 'file-data.txt');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    
    // Create file with content if it doesn't exist
    const content = `Hello! This is the file content for the Daily Challenge.
You are learning Node.js file operations.
Keep up the great work! 🚀`;
    
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(colors.yellow('Created files/file-data.txt'));
    }
    
    // Read and display the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('\n--- File Content ---');
    console.log(fileContent);
    console.log('--- End of File ---\n');
    
    return fileContent;
}

// ============================================================
// CHALLENGE: Integrate Everything
// ============================================================

console.log('╔══════════════════════════════════════╗');
console.log('║     🌟 DAILY CHALLENGE COMPLETE 🌟   ║');
console.log('╚══════════════════════════════════════╝\n');

// Task 1: Greet
console.log(colors.bold('📢 TASK 1: Basic Module System'));
const userName = 'Bootcamp Student';
console.log(greet(userName));
console.log();

// Task 2: Colorful Message
console.log(colors.bold('🎨 TASK 2: Colorful Message (NPM Module)'));
displayColorfulMessage();
console.log();

// Task 3: File Operations
console.log(colors.bold('📁 TASK 3: Advanced File Operations'));
createAndReadFile();

console.log(colors.green('✅ All tasks completed successfully!'));