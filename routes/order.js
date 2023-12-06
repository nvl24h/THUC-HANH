var express = require('express');
const {checkAuth} = require('../middleware/auth');
var router = express.Router();
/* GET users listing. */
router.post('/', checkAuth, function(req, res, next) {
  

  res.json({
      message: 'data',
      money: 'abc'
  })
});



module.exports = router;
