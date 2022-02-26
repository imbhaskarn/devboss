const express = require('express');
const router = express.Router()
const {
  body,
  validationResult
} = require('express-validator')
const conn = require('../dbConnection/db')
const passport = require('passport')
const authController = require('../controllers/auth.controller')
const formValidator = require('../customMiddlewares/formValidator');


router.get('/register', authController.register)

router.post('/register', formValidator.Registration, authController.registerAction)
// login route
router.get('/login', authController.login)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/blog',
  failureRedirect: '/auth/login',
  failureFlash: true,
}), authController.loginAction);
router.get('/logout', authController.logout)

module.exports = router;