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

// require the module as normal
var bs = require("browser-sync").create();

// .init starts the server
bs.init({
    watch: true,
    server: "./dist",
});