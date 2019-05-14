const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (env) => {
  return {
    entry: path.resolve(`./src/${env.device}.js`),
    mode: 'development',
    devtool: 'inline-source-map',
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
            },
          },
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
        title: 'smb-gallery development',
        template: 'index.html',
        inject: 'head',
        env: {
          device: env.device,
        },
      }),
    ],
    output: {
      library: `smbGallery${env.device.charAt(0).toUpperCase() + env.device.slice(1)}`,
      filename: `smb-gallery.${env.device}.js`,
      libraryTarget: 'var',
      libraryExport: 'default',
      path: path.resolve(__dirname, 'dist/'),
    },
  }
}
