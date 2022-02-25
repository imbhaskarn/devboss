const isLoggedIn = (req, res, next) => {
    console.log('checking is logged in')
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/user/login')
    }
}

module.exports = isLoggedIn;