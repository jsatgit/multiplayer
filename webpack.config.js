var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: "./game.js",
  output: {
    path: __dirname,
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
    { test: /\.css$/, loader: "style!css" }
    ]
  },
  loaders: [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel', // 'babel-loader' is also a legal name to reference
    query: {
      presets: ['es2015']
    }
  }
  ],
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] }
    })
  ]
};
