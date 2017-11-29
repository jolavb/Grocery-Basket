const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')

// Authentication Events
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
  api.signout()
    .then(ui.signoutSuccess)
    .catch(ui.sigsnoutFail)
}

// Get Stores Event
const OnGetStores = (event) => {
  api.GetStores()
    .then(ui.GetStoreSuccess)
    .catch(ui.Fail)
}

module.exports = {
  onRegistration,
  onSignIn,
  onChangePassword,
  onSignout,
  OnGetStores
}
