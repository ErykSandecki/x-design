const path = require('path');

module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    const dir = path.join(path.dirname(testPath), 'snapshots');
    const fileName = path.basename(testPath) + snapshotExtension;
    return path.join(dir, fileName);
  },

  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    const dir = path.dirname(snapshotFilePath);
    const parentDir = path.dirname(dir);
    const fileName = path.basename(snapshotFilePath, snapshotExtension);
    return path.join(parentDir, fileName);
  },

  testPathForConsistencyCheck: path.join('src', 'example.test.js'),
};
