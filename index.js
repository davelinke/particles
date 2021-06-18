const liveServer = require("live-server");
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const sass = require('sass');
const minifyHTML = require('html-minifier').minify;
const { minify: minifyJs } = require("terser");

const folder = process.argv[1].replace('index.js', '');

const srcFolder = folder + 'src';

// verify if directories exist
function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

// SCSS compressing
const parseSCSS = async (p) => {

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

const parseJs = async (p) => {
    const outFileName = p.replace('src/', 'dist/');

    try {
        fs.readFile(p, 'utf8', async (err, js) => {
            if (err) {
                console.error(err)
                return
            }

            const filename = path.basename(outFileName);

            const minifyOptions = {
                sourceMap: {
                    filename:filename,
                    url:filename+'.map'
                }
            }
            const compressedJs = await minifyJs(js, minifyOptions);

            console.log(compressedJs.code);
            console.log(compressedJs.map);
            ensureDirectoryExistence(outFileName);

            fs.writeFile(outFileName, compressedJs.code, err => {
                if (err) {
                    console.error(err);
                    return
                }

                fs.writeFile(outFileName+'.map', compressedJs.map, err => {
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

    // ensureDirectoryExistence(outFileName);

    // fs.copyFile(p, outFileName, (err) => {
    //     if (err) {
    //         console.error(err);
    //         return
    //     }
    // });
}

const parseHTML = (p) => {
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
                removeEmptyElements: true,
                removeOptionalTags: true,
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

const parseCSS = (p) => {
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

chokidar.watch(srcFolder).on('all', (event, p) => {

    if (event !== 'addDir') {

        console.log(event, p);

        const ext = path.extname(p);

        const pathCheck = p.replace(folder, '');

        // if it's delete, then delete on destination

        switch (ext.toLowerCase()) {
            case ('.scss'):
                parseSCSS(p);
                break;
            case ('.js'):
                parseJs(p);
                break;
            case ('.html'):
                parseHTML(p);
                break;
            case ('.css'):
                parseCSS(p);
                break;
            default:
                copyAsset(p);
        }

    }
});



const serverParams = {
    // port: 8181, // Set the server port. Defaults to 8080.
    // host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "./dist", // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    // ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    // file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    // wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    // mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 0, // 0 = errors only, 1 = some, 2 = lots
    // middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack

};
liveServer.start(serverParams);