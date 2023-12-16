var express = require('express');
const path = require('path')
const {checkAuth} = require('../middleware/auth');
var router = express.Router();
var slug = require('slug')
const {addProduct} = require('../services/product')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname.split('.')
    // console.log(fileName[1]);
    // console.log(file.originalname.split('.'));
    cb(null,slug(fileName[0])+ '.' +fileName[1])
  }
})

const upload = multer({ storage: storage })


/* GET users listing. */
router.post('/', checkAuth, upload.single('featureImg'), async function(req, res, next) {
  try {
    let {name, category, price, file} = await req.body
    let featureImg = req.file.filename

    if (name && category && price) {
        const add = await addProduct({name, category, price, featureImg})
        return res.json({
          message: add,
        })
      }
      else{
        return res.status(400).json('thong tin product khong hop le') 
      }
  } catch (error) {
    console.log(error);
    return res.status(500).json('loi he thong') 
  }
  
  
});



module.exports = router;
