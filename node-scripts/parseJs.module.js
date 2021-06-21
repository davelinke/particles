
const fs = require('fs');
const { ensureDirectoryExistence } = require('./utils.module');
const { minify: minifyJs } = require("terser");
const path = require('path');
const { copyAsset } = require('./utils.module');
const { ESLint } = require("eslint");

module.exports.parseJs = async (p, compress = false) => {
    const outFileName = p.replace('src/', 'dist/');
    const eslint = new ESLint();

    try {
        if (!compress) {
            fs.readFile(p, 'utf8', async (err, js) => {
                const results = await eslint.lintText(js);

                results.forEach(result => {
                    if (result.errorCount>0){
                        console.log('--lint error--');
                        console.log('file:', p);
                        result.messages.forEach((message)=>{
                            console.log(message);
                        })
                        // console.log(result);
                    }
                });
            });
            return copyAsset(p);
        }

        compress && fs.readFile(p, 'utf8', async (err, js) => {
            if (err) {
                console.error(err)
                return
            }
            fs.readFile(p, 'utf8', async (err, js) => {
                const results = await eslint.lintText(js);

                results.forEach(result => {
                    if (result.errorCount>0){
                        console.log('--lint error--');
                        console.log('file:', p);
                        result.messages.forEach((message)=>{
                            console.log(message);
                        })
                        console.log(result);
                    }
                });
            });

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