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
          exclude: /node_modules\/(?!(smb-element-observer)\/).*/,
          use: {
            loader: 'babel-loader',
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
        filename: 'smb-phone-plan.css',
      }),
    ],
    output: {
      library: 'smbPhonePlan',
      filename: 'smb-phone-plan.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      path: path.resolve(__dirname, 'dist/'),
    },
  },
]
