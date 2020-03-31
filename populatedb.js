console.log('This script populates users and posts to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Post = require('./models/posts')
var User = require('./models/users')
var jsonPost = require('./models/posts.json')
var jsonUser = require('./models/users.json')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var posts = [];
var users = [];



function userCreate(json, followers=false, followings=false, cb) {
  var userDetail = json;
  // change followers and following property here
  if (followers != false) userDetail.followers = followers;
  if (followings != false) userDetail.followings = followings;
  
  var user = new User(userDetail);
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  });
}

function postCreate(json, author, cb) {
  var postDetail = json;
  var comments = [
    { commenter: users[0], comment: 'nyenyenye watever sumbong kita sa mama mo blEhhhhh trying to make this comment a little bit longer longerer longererer longererererestestest' },
    { commenter: users[1], comment: 'ada smda skd sdkbsdkf kdsfjjsfoj sdjsodjsodj ajjdsoajd adojaodja????' },
    { commenter: users[2], comment: 'haysss magsusulat nalang ako ng paragraph para matesting tong comments thing whatever na ito' }
  ];
  postDetail.author = author;
  postDetail.comments = comments;

  var post = new Post(postDetail);

  post.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Post: ' + post);
    posts.push(post)
    cb(null, post)
  });
}

function createUsers(cb) {
  async.series([
    function(callback) {
      userCreate(jsonUser[0], false, false, callback)
    },
    function (callback) {
      userCreate(jsonUser[1], [users[0],], [users[0],], callback)
    },
    function (callback) {
      userCreate(jsonUser[2], [users[0], users[1]], [users[0], users[1]], callback)
    },
  ], cb)
}

function createPosts(cb) {
  async.series([
    function (callback) {
      postCreate(jsonPost[0], users[0], callback)
    },
    function (callback) {
      postCreate(jsonPost[1], users[1], callback)
    },
    function (callback) {
      postCreate(jsonPost[2], users[2], callback)
    },
  ], cb)
}

async.series([
  createUsers,
  createPosts
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('Users: ' + users);
      console.log('Posts: ' + posts);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  });