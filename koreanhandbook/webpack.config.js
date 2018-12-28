const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/main.js',
    quiz: './src/js/quiz.js',
    random: './src/js/random.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'static/js')
  }
}
