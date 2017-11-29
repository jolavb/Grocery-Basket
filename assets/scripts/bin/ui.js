const store = require('./../store')
const showStoresTemplate = require('../templates/store-listing.handlebars')
const showStoreItemsTemplate = require('../templates/items-by-store.handlebars')

const api = require('./api')

const Success = (response) => {

}

const Fail = (response) => {
  console.log(response)
}

const signUpSuccess = function (response) {
  console.log(response)
}

const signUpFail = function (response) {
  console.log(response)
}

const signInSuccess = function (response) {
  console.log(response)
  store.user = response.user
}

const signInFail = function (response) {
  console.log(response)
}

const changePassSuccess = function (response) {
  console.log(response)
}

const changePassFail = function (response) {
  console.log(response)
}

const signoutSuccess = function (response) {
  console.log(response)
}

const signoutFail = function (response) {
  console.log(response)
}

const GetStoreSuccess = (data) => {
  // Render Stores Template to content to display stores
  const showStoresHtml = showStoresTemplate({ stores: data.stores })
  $('#content').html(showStoresHtml)

  // Register Event Handler for Store Click
  $('#content').on('click', '.store', function () {
    const store = $(this).attr('data-id')
    api.GetStoreItems(store)
    // Display items on success
      .then(GetItemsSuccess)
      .catch(GetItemsFail)
  })
}

const GetItemsSuccess = function (data) {
  const showStoreItemsHTML = showStoreItemsTemplate({ items: data.items })
  $('#content').html(showStoreItemsHTML)
  $('table').on('click', 'button', function () {
    const item = $(this).attr('data-id')
    api.addItemToCart(item)
      .then(addItemSuccess)
      .catch(addItemFail)
  })
}

const GetItemsFail = function (response) {
  console.log(GetItemsFail)
}

const addItemSuccess = function (response) {
  console.log(response)
}

const addItemFail = function (response) {
  console.log(response)
}

module.exports = {
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  changePassSuccess,
  changePassFail,
  signoutSuccess,
  signoutFail,
  Success,
  Fail,
  GetStoreSuccess
}
