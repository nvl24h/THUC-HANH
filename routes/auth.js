var express = require('express');
var router = express.Router();
const {createUser, login} = require('../services/auth')
/* GET users listing. */
router.post('/',async function(req, res, next) {
  try {
    let data = await login(req.body)
    res.json(data)
  } catch (error) {
    if(error.status === 400){
      return res.status(400).json(error.message)
    }else{
      console.log(error);
      return res.status(500).json('Loi he thong')
    }
  }
});

router.post('/register', async function(req, res, next) {
  
  try {
    let rs = await createUser(req.body)
  
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
