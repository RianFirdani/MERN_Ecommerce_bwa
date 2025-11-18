const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const {addToCard,getAllCard} = require('express')

const router = express.Router()

router.use('/',(req,res,next) => verifyToken(req,res,next))

router.get('/',getAllCard)
router.post('/',addToCard)