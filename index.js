const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


// import routes
const apiRouter = require('./routes/api-routes.js');
const indexRouter = require('./routes/landing.js');
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout.js');
const signupRouter = require('./routes/signup.js');
const newsfeedRouter = require('./routes/newsfeed.js');
const postRouter = require('./routes/post.js');
const profileRouter = require('./routes/profile.js');

// create express app
const port = 3000;
const app = express();

// Setup handlebars
app.set('view engine', 'hbs'); // Set template 
app.engine('hbs', hbs({ // HBS Config
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: {
    count: function(array){
      var count = 0;
      if (array != null)
      {
        for (var i = 0; i < array.length; i++)
        {
          count++;
        }
      }
      return count;
  },
}
}));


//setup mongoDB database URL and options
const databaseURL = 'mongodb+srv://axel:axel123@obscuracluster-2swgt.mongodb.net/obscura?retryWrites=true&w=majority'; 
const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
};

mongoose.connect(databaseURL, options);
module.exports = mongoose;

// Sessions
app.use(session({
  secret: 'somegibberishsecret',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// Setup middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(flash());

// Global messages vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.isAuthenticated = req.session.user ? true : false;
  next();
});

// Make the following routes available
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);     
app.use('/signup', signupRouter);  
app.use('/newsfeed', newsfeedRouter);   
app.use('/post', postRouter);   
app.use('/profile', profileRouter);

// API endpoints
app.use('/api', apiRouter);

// serve static files 
app.use(express.static('public')); 
// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));