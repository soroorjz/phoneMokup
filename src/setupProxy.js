const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",  // مسیر درخواست‌ها
    createProxyMiddleware({
      target: "https://smp.devrayan.ir", // سرور مقصد
      changeOrigin: true,
      secure: false, // در صورت مشکل SSL
    })
  );
};
