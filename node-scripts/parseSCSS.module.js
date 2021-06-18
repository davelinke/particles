
const sass = require('sass');
const fs = require('fs');
const { ensureDirectoryExistence } = require('./utils.module');

module.exports.parseSCSS = async (p) => {

    const pathArray = p.split('/');
    const file = pathArray[pathArray.length - 1];

    const isInclude = (file.indexOf('_') === 0);

    // do not copy imports
    if (!isInclude) {
        const result = sass.renderSync({
            file: p,
            outputStyle: "compressed"
        });
        const css = result.css.toString();
        const jsOutput = 'export default `' + css + '`';

        let outFileName = p.replace('src/', 'dist/');
        outFileName = outFileName.replace('.scss', '.css');
        outFileName += '.js';


        ensureDirectoryExistence(outFileName);

        fs.writeFile(outFileName, jsOutput, err => {
            if (err) {
                console.error(err);
                return
            }
        });
    }
}