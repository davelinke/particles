const liveServer = require("live-server");
const path = require('path');
const chokidar = require('chokidar');

const parseCSS = require('./node-scripts/parseCSS.module').parseCss;
const parseSCSS = require('./node-scripts/parseSCSS.module').parseSCSS;
const parseHTML = require('./node-scripts/parseHTML.module').parseHTML;
const parseJs = require('./node-scripts/parseJs.module').parseJs;
const { copyAsset, deleteAsset } = require('./node-scripts/utils.module');

const folder = process.argv[1].replace('index.js', '');
const srcFolder = folder + 'src';

// start file change watchers
chokidar.watch(srcFolder).on('all', (event, p) => {

    if (event !== 'addDir') {

        if (event==='unlink') {
            return deleteAsset(p);
        }

        console.log(event, p);

        const ext = path.extname(p);

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


// // start live server
// const serverParams = {
//     // port: 8181, // Set the server port. Defaults to 8080.
//     // host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
//     root: "./dist", // Set root directory that's being served. Defaults to cwd.
//     open: true, // When false, it won't load your browser by default.
//     // ignore: 'scss,my/templates', // comma-separated string for paths to ignore
//     // file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
//     wait: 250, // Waits for all changes, before reloading. Defaults to 0 sec.
//     // mount: [['/components', './node_modules']], // Mount a directory to a route.
//     // logLevel: 0, // 0 = errors only, 1 = some, 2 = lots
//     // middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack

// };
// liveServer.start(serverParams);

// require the module as normal
var bs = require("browser-sync").create();

// .init starts the server
bs.init({
    watch: true,
    server: "./dist",
    // files: [
    //     {
    //         match: ['./dist/**'],
    //         fn:    function (event, file) {
    //             this.reload()
    //         }
    //     }
    // ]
});