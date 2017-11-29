const config = require('../config.js')
const store = require('./../store')

const signUp = function (data) {
  data = JSON.stringify(data)
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/sign-up',
    contentType: 'application/json',
    data
  })
}

const signIn = function (data) {
  data = JSON.stringify(data)
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/sign-in',
    contentType: 'application/json',
    data
  })
}

const changePassword = function (data) {
  data = JSON.stringify(data)
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/change-password/' + store.user.id,
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signout = function () {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const GetStores = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/stores/',
    contentType: 'application/json'
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signout,
  GetStores
}
