'use strict'

const custom = function(index, options) {
  const newrow = (index + 1) % 4
  if (newrow === 0) {
    return options.fn(this)
  }
  else {
    return options.inverse(this)
  }
}

module.exports = custom
