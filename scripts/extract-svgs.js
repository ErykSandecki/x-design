const fs = require('fs');

// Get output file from command line arguments
const [, , htmlFile] = process.argv;

if (!htmlFile) {
  console.error('Usage: node extract-svgs.js <output.html>');
  process.exit(1);
}

const jsFile = './figma/figma.min.js'; // Input file is fixed

const jsContent = fs.readFileSync(jsFile, 'utf8');

// Match all SVG strings (between single quotes, starting with <svg)
const svgRegex = /'(<svg[\s\S]*?<\/svg>)'/g;

let match;
let svgs = [];
while ((match = svgRegex.exec(jsContent)) !== null) {
  svgs.push(match[1]);
}

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Extracted SVGs</title>
</head>
<body>
  ${svgs.join('\n')}
</body>
</html>
`;

fs.writeFileSync(`figma/${htmlFile}.html`, htmlContent, 'utf8');
console.log(`Extracted ${svgs.length} SVGs to ${htmlFile}.html`);
