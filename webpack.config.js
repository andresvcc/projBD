
//configurations d'affichage pour l'interface visuele, afin de faire le render chez le client
module.exports = {
    entry: './src/index.jsx',
    output: {
      path: __dirname + '/public/js',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
}
