var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var orderRouter = require('./routes/order');
var userRouter = require('./routes/user');
var productRouter = require('./routes/product');

var app = express();


// ------- 2
passport.use(new FacebookStrategy({
  clientID: '1586623352074390',
  clientSecret: 'f2d72583a44319eb20abd7a3ee03e8ab',
  callbackURL: "https://xn--vn-lm-6qa1u.vn/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile)
  return cb(null, {
    id: profile.id
  });
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
}
));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 1
app.get('/auth/facebook',
  passport.authenticate('facebook'));

  //3
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('dang nhap thanh cong');
    res.redirect('/');
  });














app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
