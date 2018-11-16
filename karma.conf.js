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
            test: /\.js$/,
            loader: 'babel-loader',
            query: { presets: ['@babel/preset-env'] }
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
  });
};
