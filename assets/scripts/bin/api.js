const config = require('../config.js')
const store = require('./../store')

// Auth API Calls
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

// Store API Calls
const GetStores = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/stores/',
    contentType: 'application/json'
  })
}

// Items API Calls
const GetStoreItems = function (storeId) {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/stores/' + storeId,
    contentType: 'application/json'
  })
}

const addItemToCart = function (itemId) {
  let data = {
    cart_item: {
      user_id: store.user.id,
      item_id: itemId
    }
  }

  data = JSON.stringify(data)

  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/cart_items/',
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const removeCartItem = function (itemId) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/cart_items/' + itemId,
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const removeAllCartItems = function () {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/cart_items/',
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}


module.exports = {
  signUp,
  signIn,
  changePassword,
  signout,
  GetStores,
  GetStoreItems,
  addItemToCart,
  removeCartItem,
  removeAllCartItems
}
