const path = require('path');
const fs = require('fs');

function displayFileInfo() {
    const filePath = path.join(__dirname, 'data', 'example.txt');
    console.log('File Path:', filePath);
    
    const fileExists = fs.existsSync(filePath);
    console.log('File Exists:', fileExists);
    
    if (fileExists) {
        const stats = fs.statSync(filePath);
        console.log('File Size:', stats.size, 'bytes');
        console.log('Created At:', stats.birthtime);
    }
}

module.exports = displayFileInfo;