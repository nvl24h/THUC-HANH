var express = require('express');
const {checkAuth} = require('../middleware/auth');
const {addOrder, getAllOrder} = require('../services/order')
var router = express.Router();

router.get('/', async function(req, res, next){

  try {
    let data = await getAllOrder()
    console.log(data);
    return res.json({
      data: data
  })
} catch (error) {
  return res.status(500).json('khogn the lay order')
}


})
/* GET users listing. */
router.post('/', checkAuth, async function(req, res, next) {

  try {
      let newOrder = await addOrder(req.body.customer, req.body.items)

      return res.json({
        message: 'tao order thanh cong',
        data: newOrder
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json('khogn the tao order')
  }

  
});

module.exports = router;
