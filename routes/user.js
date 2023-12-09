var express = require('express');
var router = express.Router();
const {createUser, getUsers} = require('../services/user')

router.get('/', async (req, res, next)=>{
  try {
    let rs = await getUsers(+req.query.page, +req.query.size, req.query.search)
    if(rs.status === 200){
      return res.json(rs.data)
    }
  } catch (error) {
    if(error.status === 400){
      return res.status(400).json(error.message)
    }else{
      console.log(error);
      return res.status(500).json('Loi he thong')
    }
  }

})


router.post('/', async function(req, res, next) {
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
