import express from 'express';
import passport from 'passport';
import {IStrategyOptions, Strategy} from 'passport-local';

import {isAuthenticated} from '../middleware/passport/isauthenticated';
import {IUser} from '../ts/interfaces';
import {TDeserializeCb, TDoneCb, TSerializeCb} from '../ts/types';
import {iocContainerUsers} from '../services/ioc-container';
import {AbstractUsersRepository} from '../services/abstract-services';


const router = express.Router();
const repo = iocContainerUsers.get(AbstractUsersRepository);

async function loginVerify(username: string, password: string, done: TDoneCb): Promise<void> {
  try {
    const user = await repo.findOne({username: username});
    if (!user || !(user.password === password)) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
}

async function signupVerify(username: string, password: string, done: TDoneCb): Promise<void> {
  try {
    let user = await repo.findOne({username: username});
    if (user) {
      return done(null, false);
    } else {
      user = await repo.save({username: username, password: password});
      return done(null, user);
    }
  } catch (e) {
    return done(e);
  }
}

const options: IStrategyOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
};

passport
  .use('local-login', new Strategy(options, loginVerify))
  .use('local-signup', new Strategy(options, signupVerify));

passport.serializeUser(function(user: IUser, cb: TSerializeCb) {
  cb(null, user._id);
});

passport.deserializeUser<string>(async function(id, cb: TDeserializeCb) {
  try {
    const user = await repo.findById(id);
    cb(null, user);
  } catch (e) {
    return cb(e);
  }
});

router
  .use(passport.initialize())
  .use(passport.session());

router
  .get('/login', (req, res) => {
    res.render('users/login', {
      title: 'Авторизация',
    });
  })
  .post('/login', passport.authenticate('local-login', {
    failureRedirect: 'login',
  }), (req, res) => {
    res.redirect('/users/me');
  })
  .get('/me', isAuthenticated, (req, res) => {
    res.render('users/me', {
      title: 'Страница профиля',
      user: req.user,
    });
  })
  .get('/signup', (req, res) => {
    res.render('users/signup', {
      title: 'Регистрация',
    });
  })
  .post('/signup', passport.authenticate('local-signup', {
    successRedirect: 'me',
    failureRedirect: 'signup',
  }), (req, res) => {

  })
  .get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

export = router;
