
const sass = require('sass');
const fs = require('fs');
const { ensureDirectoryExistence } = require('./utils.module');

module.exports.parseCss = (p) => {
    const result = sass.renderSync({
        file: p,
        outputStyle: "compressed"
    });
    const css = result.css.toString();

    let outFileName = p.replace('src/', 'dist/');


    ensureDirectoryExistence(outFileName);

    fs.writeFile(outFileName, css, err => {
        if (err) {
            console.error(err);
            return
        }
    });
}