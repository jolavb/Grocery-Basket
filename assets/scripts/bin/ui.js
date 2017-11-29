const store = require('./../store')

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


const Success = (response) => {
  console.log(response)
}

const Fail = (response) => {
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
  Fail
}
