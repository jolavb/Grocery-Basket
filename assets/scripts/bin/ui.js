const store = require('./../store')
const api = require('./api')
const events = require('./events')

// Handlebars Templates
const showStoresTemplate = require('../templates/store-listing.handlebars')
const showStoreItemsTemplate = require('../templates/items-by-store.handlebars')
const showCartTemplate = require('../templates/shopping-cart.handlebars')

// General Error
const errorHandle = function (message) {
  $('.error').html(message)
}

// Auth Modal Form Error
const showError = function (msg) {
  $('.formerror-auth').html(msg)
  $('.formerror-auth').removeClass('hidden')
}


// Auth Modal Controls
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


// Cart Modal Controls
const showCartModal = function () {
  $('.cart').modal('show')
}

const Fail = (response) => {
  errorHandle('Error')
}

const clearForms = function () {
  $('input').val('')
}

const signUpSuccess = function (response) {
  clearForms()
  showModal('sign-in')
}

const signUpFail = function (response) {
  clearForms()
  showError('Error Signing Up')
}

const signInSuccess = function (response) {
  clearForms()
  store.user = response.user
  $('.modal').modal('hide')


  // Initialize Empty Cart
  const showCartHtml = showCartTemplate()
  $('.formerror-cart').addClass('hidden')
  $('#shopping-cart').html(showCartHtml)

  // Update NavBar
  $('.username').prepend('signed in as: ' + store.user.email)
  $('.auth-menu').removeClass('hidden')
  $('#sign-in').addClass('hidden')
  CheckAuth()
}

const signInFail = function (response) {
  clearForms()
  showError('Error Signing In :(')
}

const changePassSuccess = function (response) {
  clearForms()
  // Delete Users Current Cart Items
  api.removeAllCartItems()
    .then(updateCartSuccess)
    .catch(updateCartFail)

    // Signout User
  api.signout()
    .then(signoutSuccess)
    .catch(signoutFail)
}

const changePassFail = function (response) {
  clearForms()
  showError('Error Changing Password')
}

const signoutSuccess = function (response) {
  clearForms()
  $('.username').html('<span class="caret"></span>')
  $('#sign-in').removeClass('hidden')
  $('.auth-menu').addClass('hidden')
  store.user = false
  showModal('sign-in')
  changeItemGlyph('.item-btn', true)
  CheckAuth()
}

const signoutFail = function (response) {
  clearForms()
  $('.formerror').html('Error Signing out')
}

const GetStoreSuccess = (data) => {
  // Render Stores Template to content to display stores
  const showStoresHtml = showStoresTemplate({ stores: data.stores })
  $('#content').html(showStoresHtml)

  // Register Event Handler for Store Click that shows items for store
  $('#content').on('click', '.store', function () {
    const store = $(this).attr('data-id')
    loader(true)
    api.GetStoreItems(store)
      .then(GetItemsSuccess)
      .catch(GetItemsFail)
  })
}

const GetStoreSuccessFail = function () {
  errorHandle('Error Retrieving Stores')
}

// Display items on success
const GetItemsSuccess = function (data) {
  const showStoreItemsHTML = showStoreItemsTemplate({ items: data.items })
  // Render Store Items
  $('.items-view').remove()
  $('#content').append(showStoreItemsHTML)

  // Reigster Display Stores Event for Nav Links
  $('.display-stores').on('click', function () { switchView('.store-view') })
  // Turn Off Loader and Switch Views
  loader(false, '.items-view')

  // Register event that adds items to cart on item list add click
  $('.items').on('click', 'button', function () {
    const cartItem = $(this).attr('data-id')
    // if Item has been added to cart remove from cart
    const removed = changeItemGlyph(this)
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
  // Hide or Display Add Items Image Buttons depending on Auth Status
  CheckAuth()
  // Initilize Add Items Image Buttons if items added to cart
  CheckItems(data)
  // Initialize Seach Action
  itemSearch()
}

const itemSearch = function () {
  $('.ItemSearch').on('keyup', function () {
    const filter = $(this).val().toUpperCase()
    $('.panel-title').each(function () {
      if ($(this).html().toUpperCase().indexOf(filter) > -1) {
        $(this).parents('.itemcol').show()
      } else {
        $(this).parents('.itemcol').hide()
      }
    })
  })
}

const GetItemsFail = function (response) {
  errorHandle('Error Retrieving Items')
}

// Check if list item has already been added and changes
// item glyph. Returns true if item has already been added.
// Adresses addding and removing items from different stores
const CheckItems = function (items) {
  $('.cart-btn-remove').each(function (index, element) {
    const cartItemId = element.getAttribute('data-id')
    const item = $('.panel button[data-id=' + cartItemId + ']')
    if (item) {
      changeItemGlyph('.panel button[data-id=' + cartItemId + ']')
    }
  })
}

const changeItemGlyph = function (item, reset) {
  // Resets All Glyphs to plus
  if (reset) {
    if ($(item).hasClass('glyphicon-minus')) {
      $(item).removeClass('glyphicon-minus')
      $(item).removeClass('btn-danger')
      $(item).addClass('btn-success')
      $(item).addClass('glyphicon-plus')
    }
  } else {
    // Alternate Glyph between minus and plus
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
}

// Update Cart Items on success
const updateCartSuccess = function (cartItems) {
  $('.items-count').html(cartItems.cart_items.length)
  const showCartHtml = showCartTemplate({ cartItems: cartItems.cart_items })
  $('#shopping-cart').html(showCartHtml)

  // Calculate Total in cart
  CalculateExpenses(cartItems)

  // Register Remove from cart button events. On success invokes self.
  $('.cart-items').on('click', '.cart-btn-remove', function () {
    const cartItem = $(this).attr('data-id')
    api.removeCartItem(cartItem)
      .then(
        updateCartSuccess,
        changeItemGlyph('.panel button[data-id=' + cartItem + ']')
      )
      .catch(RemoveItemFail)
  })

  // Register Add from cart button events. On success invokes self.
  $('.cart-items').on('click', '.cart-btn-add', function () {
    const cartItem = $(this)
    const quantity = parseInt($(this).siblings('p').text()) + 1

    api.addCartItemQuantity(cartItem.attr('data-id'), quantity)
      .then(
        function (response) {cartItem.siblings('p').text(response.cart_item.quantity)}
      )
      .catch()
  })
}

const updateCartFail = function (response) {
  errorHandle('Error Updating Cart')
}

const addItemFail = function (response) {
  errorHandle('Error Adding to Basket')
}

const RemoveItemFail = function (response) {
  errorHandle('Error Removing from Basket')
}

// To Do
const CalculateExpenses = function (cartItems) {
  // console.log(JSON.parse(cartItems))
}

const CheckAuth = function () {
  if (store.user) {
    $('.item-btn').show()
  } else {
    $('.item-btn').hide()
  }
}

// Show/Hide Loader
const loader = function (show, target) {
  if (!show) {
    $('#loader').hide()
    switchView(target)
  } else {
    $('#loader').show()
    $('#content').hide()
  }
}

const switchView = function (target) {
  $('.main-view').hide()
  $('#content').show()
  $(target).show()
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
  Fail,
  GetStoreSuccess,
  showModal,
  showCartModal,
  updateCartSuccess,
  loader,
  updateCartFail,
  GetStoreSuccessFail
}
