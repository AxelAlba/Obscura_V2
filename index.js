const express = require('express');
const hbs = require('express-handlebars');

// import routes
const apiRouter = require('./routes/api-routes.js');
const indexRouter = require('./routes/index.js');
const loginRouter = require('./routes/login.js');
const signupRouter = require('./routes/signup.js');
const newsfeedRouter = require('./routes/newsfeed.js');
const postRouter = require('./routes/post.js');

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
}));

// Setup middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public')); // serve static files 

// Make the following routes available
app.use('/api', apiRouter); // make API available
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/newsfeed', newsfeedRouter);
app.use('/post', postRouter);

// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));

