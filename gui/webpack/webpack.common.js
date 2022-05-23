const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      // Resolve tsconfig paths
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '..', 'tsconfig.json')
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.png|\.jpe?g|\.gif$/,
        type: 'asset/resource'
      },
      // {
      //     test: /\.woff2$/i,
      //     use: {
      //         loader: 'file-loader',
      //         options: {
      //             name: '[name].[ext]',
      //             outputPath: 'fonts',
      //         },
      //     },
      // },
      // {
      //     test: /\.svg$/,
      //     use: ['@svgr/webpack'],
      // },
      // {
      //     test: /\.s[ac]ss$/,
      //     use: [
      //         'style-loader',
      //         'css-loader',
      //         {
      //             loader: 'sass-loader',
      //             options: {
      //                 sourceMap: true,
      //             },
      //         },
      //     ],
      // },
      {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
    }),

    new webpack.ProvidePlugin({
      "React": "react",
      "process": 'process/browser',
    }),
  ],
};
