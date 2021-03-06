var webpack = require('karma-webpack');

module.exports = function (config) {
  config.set({
    frameworks: [ 'jasmine' ],
    files: [
      'tests/**/*_spec.js'
    ],
    plugins: [
      webpack,
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-spec-reporter'
    ],
    browsers: [ 'Chrome' ],
    preprocessors: {
      'tests/**/*_spec.js': ['webpack'],
      'assets/javascripts/**/*.js': ['webpack']
    },
    reporters: [ 'spec', 'coverage' ],
    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
              presets: ['react', 'es2015']
            }
          },
          {
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel?presets[]=react,presets[]=es2015'
          },
        ],
        postLoaders: [{
          test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests)/,
          loader: 'istanbul-instrumenter'
        }]
      }
    },
    webpackMiddleware: { noInfo: true }
  });
};
