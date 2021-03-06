var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
const dotenv = require('dotenv')
const join = path.join
const resolve = path.resolve

const dotEnvVars = dotenv.config()
const envVariables = Object.assign({}, dotEnvVars)

const defines =
  Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key])
    memo[`__${key.toUpperCase()}__`] = val
    return memo
  }, {})

module.exports = {
  entry: {
    bundle: [
      'whatwg-fetch',
      './assets/javascripts/app.js'
    ]
    //puzzle: './assets/javascripts/puzzle.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
    //new webpack.DefinePlugin({
      //__DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
      //__PRO__: JSON.stringify(JSON.parse(process.env.BUILD_PRO || 'true'))
    //}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.DefinePlugin(defines),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'es2017', 'stage-0']
        }
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000'
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  postcss: function () {
    return [autoprefixer, precss]
  }
}
