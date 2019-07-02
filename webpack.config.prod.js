const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  {
    entry: ['./src/index.js'],
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env'],
              ],
              plugins: [
                ['syntax-dynamic-import'],
              ],
            },
          },
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
        filename: 'smb-gallery.css',
      }),
    ],
    output: {
      library: 'smbGallery',
      filename: 'smb-gallery.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      path: path.resolve(__dirname, 'dist/'),
    },
  },
]
