require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const layout = require('express-layouts')
// require('./seeds/seeds')()

//db
let db 
if (process.env.NODE_ENV == "development") {
  db = require("./config/config").mongoURI;
} else {
  db = process.env.mongoURI;
}


mongoose
  .connect(db)
  .then(process.env.NODE_ENV == "development" ? () => console.log("server connected") : "")
  .catch((error)=>{
    console.log(error);
  })

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"))
app.use(layout)
app.use('/', require('./routes/index'));
app.use('/campgrounds',require('./routes/campground'));
app.use('/users',require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 res.locals.path = req.path;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
