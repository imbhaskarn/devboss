const conn = require("../dbConnection/db");
const bcrypt = require("bcrypt");
const moment = require('moment')
const {
  validationResult
} = require('express-validator');
const {
  queryAsync
} = require("../promisify");

// register controller for GET request
const register = (req, res) => {
  if (req.user) {
    return res.redirect('/blog')
  }
  return res.render('register', {
    error: req.flash('error'),
    errors: req.flash('errors')
  })
};


// register controller for POST request
const registerAction = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty) {
    req.flash('errors', `${error}`)
    return res.redirect('/auth/register')
  }
  queryAsync("select * from Users where username= ? OR email= ?", [req.body.username, req.body.email])
    .then(async (data) => {
      console.log(data)
      if (data.length > 0) {
        req.flash('error', 'Username or Email already exists!')
        return res.redirect('/auth/register')
      }
      if (data.length === 0) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        queryAsync('INSERT INTO Users (name, username, email, password) VALUES (?,?,?,?)',
            [req.body.fname + " " + req.body.lname, req.body.username, req.body.email, hashedPassword])
          .then(data => {
            return res.redirect('/auth/login');
          })
          .catch(e => {
            console.log(e)
            req.flash('error', e)
            return res.redirect('/auth/register')
          })
      }
    })
    .catch(e => {
      req.flash('error', e)
      console.log(e)
      return res.redirect('/auth/register')
    })
};


// login controller
const login = (req, res) => {
  if (req.user) {
    return res.redirect('/blog')
  }
  return res.render("login", {
    error: req.flash('error')
  });
};




const loginAction = (req, res, next) => {
  console.log(req)
  console.log(req.flash('success'))
};



const logout = (req, res, next) => {
  req.logout()
  return res.redirect('/auth/login')
}
module.exports = {
  register,
  registerAction,
  login,
  loginAction,
  logout
}