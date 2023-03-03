const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  name
} = require('./package');
const fs = require('fs')

module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  devServer: {
    https: true,
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
    open: true,
    port: '7099',
    clientLogLevel: 'warning',
    hotOnly: false,
    disableHostCheck: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/dns/apis': {
        target: "https://fake.dns.qihoo.net",
        changeOrigin: true,
        pathRewrite: {
          '^/dns': '',
        },
        secure: false,
        headers: {
          Referer: "https://fake.dns.qihoo.net",
        },
      }
    },
  },
  output: {
    publicPath: '/',
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};