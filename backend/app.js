const express = require('express');
const router = require('./routes/index.routes');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use('/api', router);      


// ? use it for test uploading files
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage})

app.put('/upload', upload.single('file'), (req, res) => {
  console.log(req.body)
  console.log(req.file)
})

module.exports = app;