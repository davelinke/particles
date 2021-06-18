const fs = require('fs');
const path = require('path');

const ensureDirectoryExistence = (filePath)=>{
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

const copyAsset = (p) => {
    const outFileName = p.replace('src/', 'dist/');

    ensureDirectoryExistence(outFileName);

    fs.copyFile(p, outFileName, (err) => {
        if (err) {
            console.error(err);
            return
        }
    });
}

const deleteAsset = (p)=>{
    const outFileName = p.replace('src/', 'dist/');
    fs.unlinkSync(outFileName);
}

module.exports = {
    ensureDirectoryExistence:ensureDirectoryExistence,
    copyAsset:copyAsset,
    deleteAsset:deleteAsset
}