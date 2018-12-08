// Rollup plugins
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/regrafx.js',
  output: [
    { file: 'dist/iffe/regrafx.js', name: 'RGFX', format: 'iife', sourcemap: true },
    { file: 'dist/umd/regrafx.js', name: 'RGFX', format: 'umd', sourcemap: true },
  ],
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      browser: true,
      modulesOnly: true,
      extensions: ['.ts', '.js']}),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.ts', '.js']
    }),
  ],
};