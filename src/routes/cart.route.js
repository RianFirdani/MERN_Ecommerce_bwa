const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const {addToCart,getAllCart} = require('../controllers/cart.controller')

const router = express.Router()

router.use('/',(req,res,next) => verifyToken(req,res,next))

router.get('/',getAllCart)
router.post('/',addToCart)

module.exports = router