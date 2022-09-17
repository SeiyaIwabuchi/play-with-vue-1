module.exports = {
  transpileDependencies: [],
  configureWebpack: {
    watchOptions :{
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};