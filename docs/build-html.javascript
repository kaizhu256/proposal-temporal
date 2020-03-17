/*
 * build-html.javascript
 * This program converts files in /docs/*.md to /out/docs/*.html
 *
 * This program-file has extension .javascript instead of .js
 * to avoid being copied to /out/docs/ by external build-scripts.
 */
/*jslint node*/
"use strict";
let fs;
let head;
let marked;
let path;
let tail;
// require modules
fs = require("fs");
marked = require("marked");
path = require("path");
// init toplevel variables
head = fs.readFileSync("head.html.part", "utf8");
tail = fs.readFileSync("tail.html.part", "utf8");
// convert files *.md to *.html
fs.readdirSync(".").forEach(function (file) {
    let data;
    // skip files with no .md extension
    if (!(
        /\.md$/
    ).test(file)) {
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
    fs.writeFileSync(file.replace((
        /\.md$/
    ), ".html"), data);
});
// copy README.html to index.html
fs.writeFileSync("index.html", fs.readFileSync("README.html"));
