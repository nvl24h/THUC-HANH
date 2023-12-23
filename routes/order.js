var express = require('express');
const {checkAuth} = require('../middleware/auth');
const {addOrder, getAllOrder, editOder} = require('../services/order')
var router = express.Router();


router.get('/',checkAuth, async function(req, res, next){

  try {
    let data = await getAllOrder()
    console.log(data);
    return res.json({
      data: data
  })
} catch (error) {
  console.log(error);
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

router.put('/:orderID/:productID', async (req, res) => {
  
  try {
    const {orderID, productID} = await req.params
    const { quantity, discount } = await req.body;
    let data = await editOder(orderID, productID, { quantity, discount })

    return res.json({
      message: 'update product thanh cong',
      data: data
  })
} catch (error) {
  console.log(error);
  return res.status(500).json('update san pham that bai')
}

});
module.exports = router;
