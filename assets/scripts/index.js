'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./bin/events')
const ui = require('./bin/ui')
const map = require('./bin/maps')

$(() => {
  setAPIOrigin(location, config)
  $('body').show()
  // Initilize Map

  // Register Authorization Events
  $('.registration').on('submit', events.onRegistration)
  $('.sign-in').on('submit', events.onSignIn)
  $('.change-password').on('submit', events.onChangePassword)
  $('.signout').on('click', events.onSignout)

  // Register Event to Show Form Modal
  $('.auth-modal').on('click', events.onModal)
  $('.cart-modal').on('click', events.onCartModal)


  // Load Stores Events
  events.onGetStores()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
