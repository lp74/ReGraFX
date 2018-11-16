// Rollup plugins
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/regrafx.es6.js',
  dest: 'dist/umd/regrafx.rgfx.js',
  format: 'umd',
  moduleName: 'RGFX',
  sourceMap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};