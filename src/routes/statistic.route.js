const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const {getRange,getSingle} = require('../controllers/statistic.controller.js')

const router = express.Router()

router.use('/',(req,res,next)=> verifyToken(req,res,next))

router.get('/range',getRange)
router.get('/single',getSingle)


module.exports = router