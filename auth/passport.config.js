const passport = require('passport');
const flash = require('connect-flash')
const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt');

const {
    queryAsync
} = require('../promisify.js')


passport.use('local', new LocalStrategy((username, password, done) => {
    queryAsync('SELECT * from Users where `username` = ?', [username])
        .then(async (result) => {
            if (result.length === 0) return done(null, false, {
                message: "Username does not exist!"
            })

            let isMatch = await bcrypt.compare(password, result[0].password)
            if (!isMatch) {
                console.log(1)
                return done(null, false, {
                    message: "Incorrect username or password!"
                })
            }
            const user = {
                name: result[0].name,
                username: result[0].username,
                id: result[0].id,
                email: result[0].email
            }
            return done(null, user)
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