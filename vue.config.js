module.exports = {
    configureWebpack: {
      devtool: 'source-map',
    },
    devServer: {
      disableHostCheck: true,
      proxy: {
        '/api/': {
          target: 'http://localhost:8899', // target host
          ws: true, // proxy websockets
          changeOrigin: true, // needed for virtual hosted sites,
          logLevel: 'debug',
          // pathRewrite: {'^/api/': '/api/'},
        },
      },
    },
  };
  