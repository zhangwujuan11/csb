const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	publicPath: process.env.NODE_ENV == 'development' ? './' : './',
  transpileDependencies: true,
  configureWebpack: {
  	experiments: {
  	  asyncWebAssembly: true,
  	  syncWebAssembly: true
  	},
  	module:{
  	  rules:[{
  	    test: /\.wasm$/,
  	    type: "webassembly/async"
  	  }]
  	}
  },
})
