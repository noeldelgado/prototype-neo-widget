var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');
var postcss = require('rollup-plugin-postcss');

var config = {
  entry: 'src/js/main.js',
  format: 'cjs',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    postcss({
      plugins: [
        require('postcss-import')(),
        require('postcss-cssnext')(),
      ],
    }),
    commonjs(),
    babel(),
  ],
  dest: 'dist/bundle.js',
};

module.exports = function() {
  console.log("LOL")
  this.opts.bundleOptions.rollup = {
    plugins: config.plugins
  }
};