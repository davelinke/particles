
const fs = require('fs');
const { ensureDirectoryExistence } = require('./utils.module');
const { minify: minifyJs } = require("terser");
const path = require('path');
const { copyAsset } = require('./utils.module');

module.exports.parseJs = async (p, compress = false) => {
    const outFileName = p.replace('src/', 'dist/');

    try {
        if (!compress) {
            return copyAsset(p);
        }

        compress && fs.readFile(p, 'utf8', async (err, js) => {
            if (err) {
                console.error(err)
                return
            }

            const filename = path.basename(outFileName);

            const minifyOptions = {
                sourceMap: {
                    filename: filename,
                    url: filename + '.map'
                }
            }
            const compressedJs = await minifyJs(js, minifyOptions);
            
            ensureDirectoryExistence(outFileName);

            fs.writeFile(outFileName, compressedJs.code, err => {
                if (err) {
                    console.error(err);
                    return
                }

                fs.writeFile(outFileName + '.map', compressedJs.map, err => {
                    if (err) {
                        console.error(err);
                        return
                    }
                });
            });
        })
    } catch (err) {

        if (err) {
            console.error(err);
            return
        }
    }
}