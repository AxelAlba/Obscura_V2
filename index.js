const express = require('express');
const hbs = require('express-handlebars');

// import routes
const apiRouter = require('./routes/api-routes.js');
const indexRouter = require('./routes/index.js');
const loginRouter = require('./routes/login.js');
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
const mongoose = require('mongoose');
const databaseURL = 'mongodb+srv://axel:axel123@obscuracluster-2swgt.mongodb.net/obscura?retryWrites=true&w=majority'; 

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

// Make the following routes available
app.use('/api', apiRouter); // make API available
app.use('/', indexRouter);
app.use('/login', loginRouter);     
app.use('/signup', signupRouter);  
app.use('/newsfeed', newsfeedRouter);   
app.use('/post', postRouter);   
app.use('/profile', profileRouter);

// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));


