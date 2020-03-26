const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');

// Setup handlebars
app.set('view engine', 'hbs'); // Set template 
app.engine('hbs', hbs({ // HBS Config
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
}));

// Configuration for handling API endpoint data (POST methods -> ex: name: req.body.name)
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//these are the global variables, would serve as the temporary database (see Ajax lesson)
var posts = require('./models/posts.json');

// Route Handlers
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

//ajax method to get the gallery
app.get('/getGallery', (req, res) => {
  res.status(200).send(posts);
});

//route sample for the gallery
app.get('/gallerySample', (req, res) => {
  res.render('gallerySample');
});

app.get('/viewPost/:pid', (req, res) => {
  var post = posts.filter(post => post.pid == req.params.pid)[0];
  //res.status(200).send(post);
  console.log(post);
  res.render('post', {
    post: post
  });
});

app.use(express.static('public'));
app.listen(port, () => console.log(`Listening to ${port}`));

