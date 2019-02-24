const karmaBaseConfig = require('./karmaBase.config')

module.exports = function(config) {
    config.set(Object.assign({}, karmaBaseConfig(config), { singleRun: false }))
}
