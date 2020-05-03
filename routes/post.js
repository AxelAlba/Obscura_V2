const router = require('express').Router();
const postsController = require('../controllers/postsController');
const { isPrivate } = require('../middlewares/checkAuth');
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

//setup mongoDB database URL and options
const databaseURL = 'mongodb+srv://axel:axel123@obscuracluster-2swgt.mongodb.net/obscura?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

var conn = mongoose.createConnection(databaseURL, options);
var gfs;
conn.once('open', function () {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('posts');
})

// Create storage engine
const storage = new GridFsStorage({
  url: databaseURL,
  options: options,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'posts' // should match the collection name in GridFs Stream
        };
        resolve(fileInfo);
      });
    });
  }
});

// Init upload middleware
const upload = multer({ storage });

// "file" is the "name" attribute of file input
router.put('/upload', upload.single('file'), postsController.createPost);


router.get('/:pid', isPrivate, postsController.getPost);  // get single post

router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file exists
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'No image exists'
      });
    }
  });
});

router.delete('/:pid', postsController.deletePost);

router.post('/heart', postsController.heart);

module.exports = router;
