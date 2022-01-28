const conn = require("../model/db");
const bcrypt = require("bcrypt");
const {
  body,
  validator,
  check
} = require('express-validator');
const passport = require('passport')
// register controller for GET request
const register = (req, res) => {
  res.render("register");
};
// register controller for POST request
const registerAction = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  } else {
    const date = new Date()
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const sql = `INSERT INTO Users(name, email, passwords) VALUES(?,?,?)`
    conn.query(sql, [req.body.name, req.body.email, hashedPassword], (err, result) => {
      if (err) {
        req.flash('error', sqlMessage)
        return res.redirect('/auth/register')
      }
      console.log(result);
      return res.redirect('auth/register')
    })
  }

};

// login controller
const login = (req, res) => {
  res.render("login", {
    user: req.user,
    error: req.flash('error')
  });
};

const loginAction = (req, res, next) => {};

module.exports = {
  register,
  registerAction,
  login,
  loginAction,
};