const express = require('express');
const router = express.Router()
const conn = require('../model/db')
const isLoggedIn = require('../auth/authenticate')
const passport = require('passport')
const authController = require('../controllers/auth.controller')
const {
  body,
  validator,
  check
} = require('express-validator');

router.get('/register', [check('email').isEmail().custom((value, {
  req
}) => {
  return new promise((Reject, Resolve) => {
    let sql = `SELECT * from Users where email = ${req.body.email}`
    conn.query(sql, (err, res) => {
      if (err) {
        Reject(new Error('Server Error'))
      }
      if (res.length > 0) {
        console.log(res)
        Reject(new Error('E-mail already in use'))
      }
      Resolve(true);
    })
  })
}), check('password').exists().isLength({
  min: 5
})], authController.register)

router.post('/register', authController.registerAction)



// login route
router.get('/login', authController.login)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true,
}), authController.loginAction);


module.exports = router;