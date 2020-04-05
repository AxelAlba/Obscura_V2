const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// import routes
const apiRouter = require('./routes/api-routes.js');
const indexRouter = require('./routes/index.js');
const loginRouter = require('./routes/login.js');
const signupRouter = require('./routes/signup.js');
const newsfeedRouter = require('./routes/newsfeed.js');
const postRouter = require('./routes/post.js');
const profileRouter = require('./routes/profile.js');
const authRouter = require('./routes/auth.js');

// create express app
const port = 3000;
const app = express();

// Setup handlebars
app.set('view engine', 'hbs'); // Set template 
app.engine('hbs', hbs({ // HBS Config
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

// Setup middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public')); // serve static files 

//setup mongoDB database URL and options
const databaseURL = 'mongodb+srv://axel:axel123@obscuracluster-2swgt.mongodb.net/obscura?retryWrites=true&w=majority'; 

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);
module.exports = mongoose;
// Make the following routes available
app.use('/api', apiRouter); // make API available
app.use('/', indexRouter);
app.use('/login', loginRouter);     
app.use('/signup', signupRouter);  
app.use('/newsfeed', newsfeedRouter);   
app.use('/post', postRouter);   
app.use('/profile', profileRouter);
app.use('/', authRouter); // Login/registration routes

// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));

// Insert server configuration after this comment
// Sessions
/*
sessionStore = require("connect-mongoose-session-store")(express),
app = express(),
server = http.createServer(app),
sessionStore = new sessionStore({
  host: 'localhost',
  port: 27017,
  db: 'mydb',
  stringify: false,
  maxAge: 60 * 60 * 1000,
  autoRemoveExpiredSession: true
});
*/
/*
sessionStore = require("connect-mongoose-session-store")(express),
app = express(),
server = http.createServer(app),
sessionStore = new sessionStore({
    host: 'localhost',
    port: 27017,
    db: 'mydb',
    stringify: false,
    maxAge: 60 * 60 * 1000,
    autoRemoveExpiredSession: true,
    sessionSchema: 'any_mongoose_schema',        // optional
    sessionHistorySchema: 'any_mongoose_schema'  // optional
});
app.use(express.session({
    secret: 'mlpi',
    key: 'mlpi.sid',
    cookie: {
      path: '/',
      domain: '',
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    },
    store: sessionStore
}));
*/
app.use(session({
  secret: 'somegibberishsecret',
  store: new MongoStore ({
    host: '127.0.0.1',
    port: '27017',
    db: 'session',
    url: 'mongodb://localhost:27017/demo'
}),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// Flash
app.use(flash());

// Global messages vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});