const minifyHTML = require('html-minifier').minify;
const fs = require('fs');
const { ensureDirectoryExistence } = require('./utils.module');


module.exports.parseHTML = (p) => {
    const outFileName = p.replace('src/', 'dist/');

    try {
        fs.readFile(p, 'utf8', (err, html) => {
            if (err) {
                console.error(err)
                return
            }
            const compressedHTML = minifyHTML(html, {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                decodeEntities: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeEmptyElements: false,
                removeOptionalTags: false,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeTagWhitespace: true
            });


            ensureDirectoryExistence(outFileName);

            fs.writeFile(outFileName, compressedHTML, err => {
                if (err) {
                    console.error(err);
                    return
                }
            });
        })
    } catch (err) {

        if (err) {
            console.error(err);
            return
        }
    }
}