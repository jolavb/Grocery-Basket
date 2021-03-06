const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const map = require('./maps.js')

// Authentication Events
const onModal = (event) => {
  ui.showModal(event.target.id)
}

const onRegistration = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFail)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFail)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.changePassword(data)
    .then(ui.changePassSuccess)
    .catch(ui.changePassFail)
}

const onSignout = function (event) {
  event.preventDefault()
// Delete Users Current Cart Items
  api.removeAllCartItems()
    .then(ui.updateCartSuccess)
    .catch(ui.updateCartFail)

// Signout User
  api.signout()
    .then(ui.signoutSuccess)
    .catch(ui.signoutFail)
}

// Stores Events
const onGetStores = () => {
  api.GetStores()
    .then(ui.GetStoreSuccess)
    .then((data) => {
      ui.loader(false, '.store-view')
      return data
    })
    .then(map.loadMap)
    .catch(ui.GetStoreSuccessFail)
}

// Cart Events
const onCartModal = function () {
  ui.showCartModal()
}

module.exports = {
  onRegistration,
  onSignIn,
  onChangePassword,
  onSignout,
  onGetStores,
  onModal,
  onCartModal,
  loader
}
