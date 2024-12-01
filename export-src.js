const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            const ext = path.extname(file);
            if (['.tsx', '.ts', '.css', '.json'].includes(ext)) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

const srcPath = path.join(process.cwd(), 'src');
const outputPath = path.join(process.cwd(), 'src.txt');

let output = '# Source Code Export\n\n';
output += `Generated on ${new Date().toLocaleString()}\n\n`;

const files = getAllFiles(srcPath)
    .sort((a, b) => a.localeCompare(b)); // Sort files alphabetically

files.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    let content = fs.readFileSync(file, 'utf8');
    const ext = path.extname(file).substring(1);
    
    // Normalize line endings
    content = content.replace(/\r\n/g, '\n');
    
    output += `## File: ${relativePath}\n\n`;
    output += '```' + ext + '\n';
    output += content.trim(); // Trim whitespace
    output += '\n```\n\n';
});

fs.writeFileSync(outputPath, output, 'utf8'); 