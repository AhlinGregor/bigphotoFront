const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api',     createProxyMiddleware({ target: 'https://88.200.63.148:9002', changeOrigin: true }));
  app.use('/uploads', createProxyMiddleware({ target: 'http://127.0.0.1:9002', changeOrigin: true }));
  app.use('/pfps',    createProxyMiddleware({ target: 'http://127.0.0.1:9002', changeOrigin: true }));
};