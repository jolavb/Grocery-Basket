const store = require('../../store')

const checkauth = function (options) {
  if (store.user) {
    console.log('true')
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}

module.exports = checkauth
