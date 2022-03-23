const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const isAuthenticated = require('../middleware/passport/isauthenticated')

async function loginVerify (username, password, done) {
  try {
    const user = await User.findOne({username: username});
    if (!user || !(user.password === password)) { return done(null, false) }
    return done(null, user)

  } catch (e) { return done(e) }
}

async function signupVerify (username, password, done) {
  try {
    let user = await User.findOne({username: username});
    if (user) { return done(null, false) }
    else {
      user = new User({username, password});
      await user.save();
      return done(null, user)
    }
  } catch (e) { return done(e) }
}

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
};

passport
  .use('local-login', new LocalStrategy(options, loginVerify))
  .use('local-signup', new LocalStrategy(options, signupVerify));
passport.serializeUser(function (user, cb) {
  cb(null, user._id)
});
passport.deserializeUser(async function (id, cb) {
  try {
    const user = await User.findById(id);
    cb(null, user)
  } catch (e) {
    return cb(e)
  }
});

router
  .use(passport.initialize())
  .use(passport.session())

router
  .get('/login', (req, res) => {
    res.render('users/login', {
      title: 'Авторизация'
    });
  })
  .post('/login', passport.authenticate('local-login', {
    failureRedirect: 'login'
  }), (req, res) => {
    res.redirect('/users/me')
  })
  .get('/me', isAuthenticated, (req, res) => {
    res.render('users/me', {
      title: 'Страница профиля',
      user: req.user
    })
  })
  .get('/signup', (req, res) => {
    res.render('users/signup', {
      title: 'Регистрация',
    })
  })
  .post('/signup', passport.authenticate('local-signup', {
    successRedirect: 'me',
    failureRedirect: 'signup',
  }), (req, res) => {

  })
  .get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  })

module.exports = router