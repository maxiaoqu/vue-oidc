const ConsoleInfo = require('timi-tools/console/index')
const VuecliConfig = require('timi-tools/vue/vuecliConfig')

ConsoleInfo()

// config配置
let config = {
  resolveAlias: {
    '@': 'src',
    '@method': 'src/method'
  }
}

let newVuecliConfig = new VuecliConfig(config)
let vuecliConfig = newVuecliConfig.getConfig()

vuecliConfig.devServer = {
  port: 8090,
  host: '0.0.0.0',
  https: false,
  open: true
}

module.exports = vuecliConfig
