// Rollup plugins
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/regrafx.es6.js',
  output: [
    { file: 'dist/umd/regrafx.rgfx.js', name: 'RGFX', format: 'umd', sourcemap: true },
  ],
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};