var express = require('express');
const path = require('path')
const {checkAuth} = require('../middleware/auth');
var router = express.Router();
var slug = require('slug')
const {addProduct, putProduct, deleteProduct} = require('../services/product')
const multer  = require('multer');
const { error } = require('console');
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

router.put('/', checkAuth,upload.single('featureImg'), async (req, res, next) => {
  try {
    let {name, category, price, file} = await req.body
    let featureImg = req.file ? req.file.filename : undefined;
    let {idProduct} = req.query
    console.log(name, category, price, file);

    if (idProduct && (name || category || price || file || featureImg)) {
      const updateProduct  = await putProduct({idProduct, name, category, price, file, featureImg})
      return res.json({
        status: 200,
        message: updateProduct
      })
    } else {
      console.log(error);
      return res.status(400).json('update product error') 
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json('loi he thong:: update PUT') 
  }
})

router.delete('/', checkAuth, (req, res, next) => {
  try {
    const { idData } = req.query

    if (idData) {
      const detedataPd =  deleteProduct(idData)
      return res.json({
        status: 200,
        message: detedataPd
      })
    }
    
  } catch (error) {
    return res.status(500).json('loi he thong:: delete product') 
  }
})

module.exports = router;
