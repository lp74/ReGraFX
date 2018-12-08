var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.js',
      'spec/**/*.spec.js',
      'examples/**/*.spec.js'
    ],
    browsers: ['Chrome'],
    reporters: ['mocha'],
    autoWatch: true,
    preprocessors: {
      ['src/regrafx.js']: ['webpack'],
      ['src/**/*.spec.js']: ['webpack'],
      ['spec/**/*.spec.js']: ['webpack'],
      ['examples/**/*.spec.js']: ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
  });
};
