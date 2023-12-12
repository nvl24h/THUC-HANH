var express = require('express');
const {checkAuth} = require('../middleware/auth');
var router = express.Router();
const addProduct = require('../services/product')
/* GET users listing. */
router.post('/', checkAuth,async function(req, res, next) {
  try {
    let {name, category, price} = await req.body

    if (name && category && price) {
        const add = await addProduct({name, category, price})
        return res.json({
          message: add,
        })
      }
      else{
        return res.status(400).json('thong tin product khong hop le') 
      }
  } catch (error) {
    return res.status(500).json('loi he thong') 
  }
  
  
});



module.exports = router;
