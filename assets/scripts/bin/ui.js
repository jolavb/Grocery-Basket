const store = require('./../store')
const api = require('./api')

// Handlebars Templates
const showStoresTemplate = require('../templates/store-listing.handlebars')
const showStoreItemsTemplate = require('../templates/items-by-store.handlebars')
const showCartTemplate = require('../templates/shopping-cart.handlebars')

// Auth Modal Form Error
const showError = function (msg) {
  $('.formerror-auth').html(msg)
  $('.formerror-auth').removeClass('hidden')
}

const showModal = function (formClass) {
  // FormClass is ID of event button
  const targetForm = $('.' + formClass)
  const formtitle = {
    'registration': 'Sign Up',
    'sign-in': 'Sign In',
    'change-password': 'Change Pasword'
  }
  $('.formerror-auth').addClass('hidden')
  $('form').hide()
  $('.modal-title-auth').html(formtitle[formClass])

  targetForm.show()
  $('.auth').modal('show')
}

const showCartModal = function() {
  $('.cart').modal('show')
}

const Success = (response) => {

}

const Fail = (response) => {
  console.log(response)
}

const signUpSuccess = function (response) {
  showModal('sign-in')
}

const signUpFail = function (response) {
  showError('Error Signing Up')
}

const signInSuccess = function (response) {
  store.user = response.user
  $('.modal').modal('hide')

  // Initialize Empty Cart
  const showCartHtml = showCartTemplate()
  $('.formerror-cart').addClass('hidden')
  $('#shopping-cart').html(showCartHtml)

  // Update NavBar
  $('.navbar-text').text('signed in as: ' + store.user.email)
  $('#sign-out').removeClass('hidden')
  $('#sign-in').addClass('hidden')
}

const signInFail = function (response) {
  showError('Error Signing In')
}

const changePassSuccess = function (response) {
  $('.formerror').html('Error changing passwords')
}

const changePassFail = function (response) {
  showError('Error changing passwords')
}

const signoutSuccess = function (response) {
  $('.navbar-text').text('')
  $('#sign-in').removeClass('hidden')
  $('#sign-out').addClass('hidden')
  showModal('sign-in')
}

const signoutFail = function (response) {
  $('.formerror').html('Error Signing out')
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
    const cartItem = $(this).attr('data-id')
    // if Item has been added to cart remove from cart
    const removed = changeCartGlyph(this)
    if (removed) {
      $(this).removeClass('glyphicon-minus')
      api.removeCartItem(cartItem)
        .then(updateCartSuccess)
        .catch(RemoveItemFail)
    } else {
      api.addItemToCart(cartItem)
        .then(updateCartSuccess)
        .catch(addItemFail)
    }
  })
}

// Check if list item has already been added and changes
// item glyph. Returns true if item has already been added.
const changeCartGlyph = function (item) {
  if ($(item).hasClass('glyphicon-minus')) {
    $(item).removeClass('glyphicon-minus')
    $(item).removeClass('btn-danger')
    $(item).addClass('btn-success')
    $(item).addClass('glyphicon-plus')
    return true
  } else {
    $(item).removeClass('glyphicon-minus')
    $(item).removeClass('btn-success')
    $(item).addClass('btn-danger')
    $(item).addClass('glyphicon-minus')
    return false
  }
}

const GetItemsFail = function (response) {
  console.log(GetItemsFail)
}

// Update Cart Items on success
const updateCartSuccess = function (cartItems) {
  console.log('hello')
  $('.items-count').html(cartItems.items.length)
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
  GetStoreSuccess,
  showModal,
  showCartModal,
  updateCartSuccess
}
