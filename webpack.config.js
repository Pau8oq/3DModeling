const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'app', 'index'),
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    host: 'localhost',
    port: 8080,
    hot: true,
    liveReload: true
  },
  experiments: {
    outputModule: true
  },
  output: {
    library: {
       type: "module"
    },
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};