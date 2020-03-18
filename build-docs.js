/*
 * build-html.javascript
 * This program will copy/convert files in /docs/ to /out/docs/
 */
/*jslint node*/
"use strict";
let directoryOutDocs;
let fs;
let head;
let marked;
let path;
let tail;
// chdir to /docs/
process.chdir("docs");
// require modules
fs = require("fs");
marked = require("marked");
path = require("path");
// init toplevel variables
directoryOutDocs = path.normalize("../out/docs/0").slice(0, -1);
head = fs.readFileSync("head.html.part", "utf8");
tail = fs.readFileSync("tail.html.part", "utf8");
// process files in /docs/
fs.readdirSync(".").forEach(function (file) {
    let data;
    switch (path.extname(file)) {
    // copy files *.css, *.html, *.js to /out/docs
    case ".css":
    case ".html":
    case ".js":
        fs.copyFileSync(file, directoryOutDocs + file);
        return;
    // convert files *.md to *.html
    case ".md":
        break;
    // skip remaining files
    default:
        return;
    }
    data = fs.readFileSync(file, "utf8");
    // replace links *.md with *.html
    data = data.replace((
        /\.md([)#])/g
    ), ".html$1");
    // process markdown includes
    data = data.replace((
        /^\{\{.*\}\}$/gm
    ), function (file) {
        return fs.readFileSync(
            path.normalize(file.slice(2, -2)),
            "utf8"
        ).trim();
    });
    // convert data from markdown to html
    data = marked(data, {});
    // prepend head.html.part and append tail.html.part
    data = head + data + tail;
    // save as .html
    fs.writeFileSync(directoryOutDocs + file.replace((
        /\.md$/
    ), ".html"), data);
});
// copy README.html to index.html
fs.copyFileSync(
    directoryOutDocs + "README.html",
    directoryOutDocs + "index.html"
);
