const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { getAllInvoice, getInvoiceById, getInvoiceByEmail, checkOut } = require('../controllers/invoice.controller')

const router = express.Router()

router.use('/',(req,res,next)=> verifyToken(req,res,next))

router.get('/',getAllInvoice)
router.get('/:id',getInvoiceById)
router.get('/:email',getInvoiceByEmail)
router.post('/',checkOut)

module.exports = router