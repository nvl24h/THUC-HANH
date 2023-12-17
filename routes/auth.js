var express = require('express');
var router = express.Router();
const {login} = require('../services/auth')
const {createUser} = require('../services/user')
const multer = require('multer')
const path = require('path')
const slug = require('slug')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    // console.log(file.originalname.split('.'));
    let fileImage = file.originalname.split('.')

    cb(null,slug(fileImage[0])+ '.' +fileImage[1])
  }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.post('/login',async function(req, res, next) {
  try {
    let data = await login(req.body)
    res.json(data)
  } catch (error) {
    if(error.status === 400){
      return res.status(400).json(error.message)
    }else{
      // console.log(error);
      return res.status(500).json('Loi he thong')
    }
  }
});

router.post('/register', upload.single('image'),async function(req, res, next) {
  
  try {
    let rs = await createUser(req.body, req.file)

  
    if(rs.status === 200){
      return res.json(rs)
    }
  } catch (error) {
    if(error.status === 400){
      return res.status(400).json(error.message)
    }else{
      return res.status(500).json('Loi he thong')
    }
  }
});


module.exports = router;
