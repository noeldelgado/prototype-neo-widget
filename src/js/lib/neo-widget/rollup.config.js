import buble from 'rollup-plugin-buble';

export default {
  entry: 'index.js',
  format: 'umd',
  moduleName: 'NeoWidget',
  plugins: [buble()],
  dest: './lib/index.js',
};
