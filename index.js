const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const path = require('path');
const port = 3000;

// Serve static files
app.use(express.static('public'));

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

app.get('/test', (req, res) => {



});

/*
  This takes the contents of the public folder and makes it accessible through the URL.
  i.e. public/css/styles.css (in project) will be accessible through http://localhost:9090/css/styles.css
*/

app.use(express.static('public'));
app.listen(port, () => console.log(`Listening to ${port}`));

