const store = require('./../store')
const showStoresTemplate = require('../templates/store-listing.handlebars')

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
  console.log(data)
  const showStoresHtml = showStoresTemplate({ stores: data.stores })
  $('#all-stores').html(showStoresHtml)
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
