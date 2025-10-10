const fs = require('fs');
const path = require('path');

const projectRoot = process.argv[2];

if (!projectRoot) {
  console.error('Give path, np.:\nnode deleteSnapshots.js ./myProject');
  process.exit(1);
}

function deleteSnapshots(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file === 'snapshots') {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`Removed folder: ${fullPath}`);
      } else {
        deleteSnapshots(fullPath);
      }
    }
  });
}

deleteSnapshots(path.resolve(projectRoot));
console.log('Removed done!');
