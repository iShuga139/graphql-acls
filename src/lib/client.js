module.exports = {
  postgres: () => require('./postgres/index'),
  mongo: () => require('./mongo/index'),
}
