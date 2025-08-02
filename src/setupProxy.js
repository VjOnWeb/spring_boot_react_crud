// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Not needed. Using runtime API switching.
};

/* Edited on Jul 12
module.exports = function (app) {
  app.use(
    '/api/**',
    createProxyMiddleware({
      target: 'http://localhost:9898', // Replace with the actual URL of your Spring Boot server
      changeOrigin: true,
    })
  );
*/
  // app.use(
  //   '*',
  //   createProxyMiddleware({
  //     target: 'https://alphavantageapi.co', // Replace with the actual URL of your Spring Boot server
  //     changeOrigin: true,
  //   })
  // );
 // };
