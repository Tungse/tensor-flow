const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  {
    entry: ['./src/js/index.js'],
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'tensor-flow.css',
      }),
    ],
    output: {
      library: 'tensorFlow',
      filename: 'tensor-flow.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      path: path.resolve(__dirname, 'dist/'),
    },
  },
]
