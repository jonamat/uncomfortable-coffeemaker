const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const common = require('./webpack.common');

const dotenvs = dotenv.config({ debug: true, path: path.resolve(__dirname, '..', '.env') }).parsed
console.info(`\n\nDevelopment build. Configuration loaded: \n${Object.entries(dotenvs).map(pair => pair.join(': ')).join('\n')}\n\n`)

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            comments: true, // Preserve webpack config comments
            sourceMaps: true,
            presets: ['@babel/preset-env', '@babel/react', '@babel/typescript'],
            plugins: [
              '@babel/plugin-transform-runtime',
              'babel-plugin-typescript-to-proptypes', // transform static to runtime type checking
            ],
          },
        },
      },
    ]
  },

  plugins: [
    // Override process.env with custom vars defined in .env
    new webpack.DefinePlugin(
      Object.fromEntries(
        Object.entries({
          ...process.env,
          ...dotenvs,
          NODE_ENV: 'development',
        }).map(([key, value]) => ['process.env.' + key, JSON.stringify(value)]),
      ),
    ),

    // Generate views
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, '../', 'src', 'templates', 'index.ejs'),
      minify: false,
    }),
  ],

  output: {
    publicPath: "/"
  },

  devServer: {
    static: path.resolve(__dirname, '../', 'public'),
    compress: false,
    historyApiFallback: true,
    host: 'localhost', // Set to 0.0.0.0 for external access
    port: dotenvs.DEV_PORT,
    open: '/',
    watchFiles: ['src/**/*', 'public/**/*'],
    // https: true,
    client: {
      progress: true,
      logging: 'warn',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
