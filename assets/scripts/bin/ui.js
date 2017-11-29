const store = require('./../store')
const showStoresTemplate = require('../templates/store-listing.handlebars')
const showStoreItemsTemplate = require('../templates/items-by-store.handlebars')
const showCartTemplate = require('../templates/shopping-cart.handlebars')

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

  // Register Event Handler for Store Click that shows items for store
  $('#content').on('click', '.store', function () {
    const store = $(this).attr('data-id')
    api.GetStoreItems(store)
      .then(GetItemsSuccess)
      .catch(GetItemsFail)
  })
}

// Display items on success
const GetItemsSuccess = function (data) {
  const showStoreItemsHTML = showStoreItemsTemplate({ items: data.items })
  $('#content').html(showStoreItemsHTML)
  // Register event that adds items to cart on item list add click
  $('.items').on('click', 'button', function () {
    const item = $(this).attr('data-id')
    api.addItemToCart(item)
      .then(updateCartSuccess)
      .catch(addItemFail)
  })
}

const GetItemsFail = function (response) {
  console.log(GetItemsFail)
}

// Update Cart Items on success
const updateCartSuccess = function (cartItems) {
  console.log(cartItems)
  const showCartHtml = showCartTemplate({ cartItems: cartItems.items })
  $('#shopping-cart').html(showCartHtml)

  // Calculate Total in cart
  CalculateExpenses(cartItems)

  // Register Remove from cart button events. On success invokes self.
  $('.cart-items').on('click', 'button', function () {
    const cartItem = $(this).attr('data-id')
    api.removeCartItem(cartItem)
      .then(updateCartSuccess)
      .catch(RemoveItemFail)
  })
}

const addItemFail = function (response) {
  console.log(response)
}

const RemoveItemFail = function (response) {
  console.log(response)
}

const CalculateExpenses = function (cartItems) {
  // console.log(JSON.parse(cartItems))
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
