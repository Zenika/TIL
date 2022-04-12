const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 6058
  },
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'TIL | Today I Learned',
    },
  }
})
