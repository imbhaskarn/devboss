const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt');

const {
    queryAsync
} = require('../promisify.js')


passport.use('local', new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {

    queryAsync('SELECT * from Users where `email` = ?', [email])
        .then(async (result) => {

            if (result.length === 0) return done(null, false, {
                message: "Email is not registered!"
            })

            let isMatch = await bcrypt.compare(password, result[0].password)
            if (!isMatch) return done(null, false, {
                message: "Incorrect email or password!"
            })
            const user = result[0]
            return done(null, user, {
                message: "Welcome back" + user.name
            })
        })
        .catch((err) => {
            console.log(err);
        });
}))

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    queryAsync('SELECT * from Users where `id` = ?', [user.id])
        .then((user) => {
            done(null, user[0])
        })
});