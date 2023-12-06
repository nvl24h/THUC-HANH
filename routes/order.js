var express = require('express');
var router = express.Router();
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body.username , req.body.password);
  
  res.json({
      message: 'dang nhap thanh cong',
      token: 'abc'
  })
});



module.exports = router;
