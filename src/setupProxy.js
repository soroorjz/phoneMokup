const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",  // مسیر درخواست‌ها
    createProxyMiddleware({
      target: "https://smp.devrayan.ir:2053", // سرور مقصد
      changeOrigin: true,
      secure: false, // در صورت مشکل SSL
    })
  );
};
