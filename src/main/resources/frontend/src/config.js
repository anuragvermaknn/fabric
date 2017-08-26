require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  api: {
    host: process.env.APIHOST || 'http://api.marketcloud.it',
    publicKey: 'c21274a7-d13b-41e3-b875-c848909aa648'
  },
  app: {
    title: 'FabriCoot',
    description: 'Be Your Own Designer',
    head: {
      titleTemplate: 'FabriCoot: %s',
      meta: [
        { name: 'description', content: 'Be Your Own Designer.' },
        { charset: 'utf-8' },
        { property: 'apple-mobile-web-app-capable', content: 'yes' },
        { property: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        { property: 'og:site_name', content: 'Be Your Own Designer' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Be Your Own Designer' },
        { property: 'og:description', content: 'Be Your Own Designer' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@hkarkk' },
        { property: 'og:creator', content: '@hkarkk' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  },

}, environment);
