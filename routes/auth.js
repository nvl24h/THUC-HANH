var express = require('express');
var router = express.Router();
const {createUser} = require('../services/auth')
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body.username , req.body.password);
  
  res.json({
      message: 'dang nhap thanh cong',
      token: 'abc'
  })
});

router.post('/register', async function(req, res, next) {
  try {
    let rs = await createUser(req.body)
  
    if(rs.status === 200){
      return res.json(rs)
    }
  } catch (error) {
    if(error.status === 400){
      return res.status(400).json('Email da ton tai')
    }else if(error.status === 500) {
      return res.status(500).json('Dinh dang email khong hop le')
    }else {
      return res.status(500).json('loi he thong')
    }
  }
});


module.exports = router;
