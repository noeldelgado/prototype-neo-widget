import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
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
