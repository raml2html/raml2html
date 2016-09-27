const fs = require('fs');
const path = require('path');

function dirTree(dirPath, basePath) {
  basePath = basePath || '';
  let tree = {};

  let dir = fs.readdirSync(dirPath);
  dir.forEach(entry => {
    let entryPath = path.join(dirPath, entry);
    let isDir = fs.statSync(entryPath).isDirectory();

    if (isDir) {
      tree[entry] = dirTree(entryPath, basePath);
    } else {
      tree[entry.replace(/\.[\w]*$/, '')] = path.join(basePath, entryPath);
    }
  });

  return tree;
}

module.exports = dirTree;
