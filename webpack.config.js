const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = (env) => {
  return {
    entry: ['./src/js/index.js'],
    mode: 'development',
    devtool: 'inline-source-map',
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
              loader: 'style-loader',
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
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'tensor-flow development',
        template: 'index.html',
        inject: 'head',
      }),
    ],
    output: {
      library: 'tensorFlow',
      filename: 'tensor-flow.bundle.js',
      libraryTarget: 'var',
      libraryExport: 'default',
      path: path.resolve(__dirname, 'dist/'),
    },
  }
}
