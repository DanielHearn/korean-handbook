module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pwa: {
    serviceWorker:false,
    workboxPluginMode:'InjectManifest',
    workboxOptions: {
      swSrc: './app/sw.js', /* Empty file. */
    }
  }
}
