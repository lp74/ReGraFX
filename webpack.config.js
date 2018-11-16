const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    RGFX: './src/regrafx.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'var',
    library: '[name]'
  }
};
