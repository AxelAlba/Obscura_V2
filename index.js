const express = require('express');
const hbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const mongoose = require('./models/connection');
const { envPort, sessionKey } = require('./config');


// import routes
const apiRouter = require('./routes/api-routes.js');
const indexRouter = require('./routes/landing.js');
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout.js');
const signupRouter = require('./routes/signup.js');
const discoverRouter = require('./routes/discover.js');
const followingRouter = require('./routes/following.js');
const postRouter = require('./routes/post.js');
const profileRouter = require('./routes/profile.js');

// create express app
const app = express();
const port = envPort || 3000;

// Setup handlebars
app.set('view engine', 'hbs'); // Set template 
app.engine('hbs', hbs({ // HBS Config
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: {
    count: function(array) {
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
    concatURL: function(string) {
      // return a route
      return "/post/image/" + string;
    }
}
}));
// Sessions
app.use(session({
  secret: sessionKey,
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
app.use('/following', followingRouter);
app.use('/discover', discoverRouter);   
app.use('/post', postRouter);   
app.use('/profile', profileRouter);

// API endpoints
app.use('/api', apiRouter);

// serve static files 
app.use(express.static('public')); 
// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));