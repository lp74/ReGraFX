// Rollup plugins
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/regrafx.js',
  output: [
    { file: 'dist/iffe/regrafx.js', name: 'RGFX', format: 'iife', sourcemap: true },
    { file: 'dist/umd/regrafx.js', name: 'RGFX', format: 'umd', sourcemap: true },
  ],
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};