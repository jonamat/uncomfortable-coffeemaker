const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const workboxPlugin = require('workbox-webpack-plugin');
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const common = require('./webpack.common');

const envs = dotenv.config({ debug: true, path: path.resolve(__dirname, '..', '.env') })?.parsed || {};
console.info(`\n\nProduction build. Configuration loaded: \n${Object.entries(envs).join('\n')}\n\n`)

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[fullhash].bundle.js',
    path: path.resolve(__dirname, '..', '..', 'data'),
    chunkFilename: 'dynamic/[name].[fullhash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              comments: true, // Preserve webpack config comments
              sourceMaps: false,
              presets: ["@babel/preset-env", '@babel/react', '@babel/typescript'],
              plugins: [
                '@babel/plugin-transform-runtime',
                [
                  'babel-plugin-jsx-remove-data-test-id', // Remove test attributes
                  {
                    attributes: 'data-testid',
                  },
                ],
              ],
            },
          },
        ],
      },
    ]
  },

  plugins: [
    // Clean build dir
    new CleanWebpackPlugin(),

    // Override process.env with custom vars defined in .env
    new webpack.DefinePlugin(
      Object.fromEntries(
        Object.entries({
          ...process.env,
          ...envs,
          NODE_ENV: 'production',
        }).map(([key, value]) => ['process.env.' + key, JSON.stringify(value)]),
      ),
    ),

    // Generate views
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'templates', 'index.ejs'),
      templateParameters: {
        // Put here vars
      },
      minify: true,
    }),

    // Copy static assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '..', 'public'),
          to: '.',
        },
      ],
    }),

    new BundleStatsWebpackPlugin({
      outDir: '../stats/'
    })

    // Generate service worker and define runtime caching
    // new workboxPlugin.GenerateSW({
    //     swDest: 'service-worker.js',
    //     clientsClaim: true,
    //     skipWaiting: true,
    //     exclude: [/\.map$/, /manifest\.json$/],
    //     cleanupOutdatedCaches: true,
    //     maximumFileSizeToCacheInBytes: 50 * Math.pow(1024, 2),
    // }),
  ],
});
