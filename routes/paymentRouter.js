const router = require('express').Router();

const paymentCtrl = require('../controllers/paymentCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/payment')
    .get(auth,authAdmin,paymentCtrl.getPayments)
    .post(auth,authAdmin,paymentCtrl.createPayment)

// router.route('/products/:id')
//     .delete(auth,authAdmin,productCtrl.deleteProduct)
//     .put(auth,authAdmin,productCtrl.updateProduct)

module.exports = router;