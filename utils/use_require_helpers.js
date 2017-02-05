// writes helpers require for vnc.html (they should output app.js)
var fs = require('fs');
var path = require('path');

module.exports = {
    'amd': (base_out_path, out_path) => {
        // setup for requirejs
        fs.writeFile(out_path, 'requirejs(["app/ui"], function (ui) {});', (err) => { if (err) throw err; });
        console.log(`Please place RequireJS in ${path.join(base_out_path, 'require.js')}`);
        return `<script src="require.js" data-main="${path.relative(base_out_path, out_path)}"></script>`;
    },
    'commonjs': (base_out_path, out_path) => {
        var browserify = require('browserify');
        var b = browserify(path.join(base_out_path, 'app/ui.js'), {});
        b.bundle().pipe(fs.createWriteStream(out_path));
        return `<script src="${path.relative(base_out_path, out_path)}"></script>`;
    },
    'systemjs': (base_out_path, out_path) => {
        fs.writeFile(out_path, 'SystemJS.import("./app/ui.js");', (err) => { if (err) throw err; });
        console.log(`Please place SystemJS in ${path.join(base_out_path, 'system-production.js')}`);
        return `<script src="system-production.js"></script>\n<script src="${path.relative(base_out_path, out_path)}"></script>`;
    },
    'umd': null,
}
