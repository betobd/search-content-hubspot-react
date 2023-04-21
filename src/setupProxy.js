import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.hubapi.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/cms/v3/site-search',
      },
    })
  );
};
