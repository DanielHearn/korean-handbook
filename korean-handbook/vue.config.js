module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pwa: {
    serviceWorker: true,
    workboxOptions: {
      skipWaiting: true,
    },
  },
}
